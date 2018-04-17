<template>
  <div id="nav">
    <el-tree
      :data="nodeList"
      node-key="id"
      ref="tree"
      :load="loadChildren"
      lazy
      highlight-current
      empty-text=""
      @node-click="handleNodeClick"
      :props="defaultProps">
    </el-tree>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
var zookeeper = require("node-zookeeper-client");
const chalk = require("chalk");
var FileTime = require("win32filetime");
var moment = require("moment");
var logger = require("../../main/components/common/logger");
const ZK_PERMISSIONS_TYPES = require("../../main/components/common/zk.permissions.ts")
  .Types;

export default {
  data() {
    return {
      clients: [],
      currentClient: -1,
      nodeList: [],
      defaultProps: {
        children: "children",
        label: "label",
        isLeaf: "leaf"
      }
    };
  },
  created() {
    // const HOST = "192.168.1.103:2181,192.168.1.103:2182,192.168.1.103:2183";
    // var client = zookeeper.createClient(HOST);
    // const rootPath = "/";
    // var vm = this;
    // vm.currentClient = 0;
    // client.host = HOST;
    // vm.clients.push(client);
    // client.once("connected", function() {
    //   logger.info(vm, "Connected to " + client.host + " .");
    //   vm.listChildren(client, rootPath, function(id, label, path, stat) {
    //     var isLeaf = stat.numChildren === 0;
    //     vm.nodeList.push({
    //       id: id,
    //       label: label,
    //       path: path,
    //       leaf: isLeaf,
    //       children: []
    //     });
    //     vm.setData(stat);
    //     // vm.addHost({
    //     //       name: "test",
    //     //       address: HOST
    //     //     });
    //   });
    // });
    // client.connect();
    this.connect(this.hosts[0]);
  },
  watch: {},
  computed: {
    ...mapGetters({
      hosts: "getHosts"
    })
  },
  methods: {
    connect(host) {
      console.log("connect to " + host.address);
      var client = zookeeper.createClient(host.address);
      const rootPath = "/";
      var vm = this;

      vm.currentClient = 0;
      client.host = host.address;
      vm.clients.push(client);

      client.once("connected", function() {
        console.log("connected");
        logger.info(vm, "Connected to " + client.host + " .");
        vm.listChildren(client, rootPath, function(id, label, path, stat) {
          var isLeaf = stat.numChildren === 0;
          vm.nodeList.push({
            id: id,
            label: label,
            path: path,
            leaf: isLeaf,
            children: []
          });
          vm.setData(stat);
        });
      });

      client.connect();
    },
    listChildren(client, path, callback) {
      var vm = this;
      client.getChildren(
        path,
        function(event) {
          console.log("Got watcher event: %s", event);
          // this.listChildren(client, path);
        },
        function(error, children, stat) {
          if (error) {
            var message = `Failed to list children of ${path} due to: ${error}.`;
            logger.error(vm, message);
            return;
          }

          for (var i = 0; i < children.length; i++) {
            var id = i;
            var label = children[i];
            var nodePath = path !== "/" ? path + "/" + label : path + label;

            callback(id, label, nodePath, stat);
          }
        }
      );
    },
    loadChildren(node, resolve) {
      var vm = this;

      if (node.level === 0) {
        return resolve([{ name: "region" }]);
      }
      // if (node.level > 1) return resolve([]);

      var client = this.clients[this.currentClient];

      logger.warn(
        vm,
        `load children for ${node.data.path}, level: ${node.level}`
      );

      client.getChildren(
        node.data.path,
        function(event) {
          console.log("Got watcher event: %s", event);
        },
        function(error, children, stat) {
          if (error) {
            logger.error(
              vm,
              `Failed to list children of ${node.data.path} due to: ${error}.`
            );
            return;
          }

          if (children.length === 0) {
            var nodeData = vm.getNodeData(nodePath, function(data) {
              stat.data = data.toString("utf8");
              stat.path = nodePath;
              vm.setData(stat);
            });
            return resolve([]);
          }
        }
      );

      var nodePath = node.data.path;
      var data = [];

      this.listChildren(client, nodePath, function(id, label, path, stat) {
        var isLeaf = stat.numChildren === 0;
        data.push({
          id: id,
          label: label,
          path: path,
          leaf: isLeaf,
          children: []
        });
        resolve(data);

        var nodeData = vm.getNodeData(nodePath, function(data) {
          stat.data = data.toString("utf8");
          stat.path = nodePath;
          vm.setData(stat);
        });
      });
    },
    setData(node) {
      var vm = this;

      var fromBuffer = function(buffer) {
        var low = buffer.readUInt32LE(0);
        var high = buffer.readUInt32LE(4);
        var date = FileTime.toDate({ low: low, high: high });
        return moment(date).format("YYYY-MM-DD HH:MM:SS:SSS");
      };
      var nodeInfo = {
        path: node.path === undefined ? "/" : node.path,
        data: node.data,
        version: node.version,
        aversion: node.aversion,
        cversion: node.cversion,
        ctime: fromBuffer(node.ctime),
        czxid: node.czxid.readUInt8(0),
        mtime: fromBuffer(node.mtime),
        mzxid: node.mzxid.readUInt8(0),
        ephemeralOwner: node.ephemeralOwner.readUInt8(0),
        dataLength: node.dataLength,
        numChildren: node.numChildren
      };

      this.clients[this.currentClient].getACL(nodeInfo.path, function(
        error,
        acls,
        stat
      ) {
        var aclText = "";
        if (error) {
          logger.error(error.stack);
          nodeInfo.acl = aclText;
          vm.$store.commit("UPDATE_NODE_INFO", nodeInfo);
          return;
        }

        for (var i = 0; i < acls.length; i++) {
          var scheme = acls[i].id.scheme;
          var id = acls[i].id.id;
          var permission = ZK_PERMISSIONS_TYPES[acls[i].permission];
          aclText += scheme + ":" + id + ":" + permission + ", ";
        }

        nodeInfo.acl = aclText.substring(0, aclText.length - 2);
        vm.$store.commit("UPDATE_NODE_INFO", nodeInfo);
      });
    },
    getNodeData(path, callback) {
      var vm = this;
      this.clients[this.currentClient].getData(
        path,
        function(event) {
          console.log("Got event: %s.", event);
        },
        function(error, data, stat) {
          if (error) {
            logger.error(vm, error.stack);
            return;
          }
          if (data === undefined) {
            data = "";
          }
          callback(data);
        }
      );
    },
    addHost(host) {
      var vm = this;
      vm.$store.commit("ADD_HOST", host);
    },
    handleNodeClick(data, node, element) {
      var vm = this;
      var path = data.path;
      this.clients[this.currentClient].getData(
        path,
        function(event) {
          console.log("Got event: %s.", event);
        },
        function(error, data, stat) {
          if (error) {
            logger.error(vm, error.stack);
            return;
          }

          if (data === undefined) {
            stat.data = "";
          } else {
            stat.data = data.toString("utf8");
          }
          stat.path = path;
          vm.setData(stat);
        }
      );
    }
  }
};
</script>

<<style>
#nav {
  width:100%;
}

.el-tree {
  border: none;
}

.el-tree-node__label {
  font-size: 12px;
}

.el-checkbox__inner {
  width: 14px;
  height: 14px
}
</style>
