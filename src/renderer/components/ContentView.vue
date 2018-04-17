<template>
  <div class="content">
    <el-row id="breadcrumb">
      <el-breadcrumb separator="/" >
          <el-breadcrumb-item :key="breadcrumb" v-for="breadcrumb in breadcrumbs">{{breadcrumb}}</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row> 
    <el-row :gutter="20">
      <el-col :xs="17" :sm="17" :md="17" :lg="17">
        <el-input placeholder="" v-model="node.path" size="small" disabled>
          <template slot="prepend">Path</template>
        </el-input>
      </el-col>
      <el-col :xs="4" :sm="4" :md="4" :lg="4" :offset="1">
        <el-input placeholder="" v-model="node.version" size="small" disabled>
          <template slot="prepend">Version</template>
        </el-input>
      </el-col>
    </el-row>
    <el-row :gutter="5">
      <el-col :sm="4" :md="4">
        <el-input placeholder="" v-model="node.czxid" size="small" disabled>
          <template slot="prepend">CZXID</template>
        </el-input>
      </el-col>
      <el-col :sm="7" :md="7" style="padding-right:0">
        <el-input placeholder="" v-model="node.ctime" size="small" disabled>
          <template slot="prepend">CTIME</template>
        </el-input>
      </el-col>
      <el-col :sm="4" :md="4">
        <el-input placeholder="" v-model="node.mzxid" size="small" disabled>
          <template slot="prepend">MZXID</template>
        </el-input>
      </el-col>
      <el-col :sm="7" :md="7" style="padding-right:0">
        <el-input placeholder="" v-model="node.mtime" size="small" disabled>
          <template slot="prepend">MTIME</template>
        </el-input>
      </el-col>
    </el-row>
    <el-row :gutter="15">
      <el-col :sm="5" :md="5" style="padding-right:0">
        <el-input placeholder="" v-model="node.cversion" size="small" disabled>
          <template slot="prepend">CVERSION</template>
        </el-input>
      </el-col>
      <el-col :sm="4" :md="4" style="padding-right:0">
        <el-input placeholder="" v-model="node.aversion" size="small" disabled>
          <template slot="prepend">AVERSION</template>
        </el-input>
      </el-col>
      <el-col :sm="7" :md="7">
        <el-input placeholder="" v-model="node.acl" size="small" disabled>
          <template slot="prepend">ACL</template>
        </el-input>
      </el-col>
      <el-col :sm="5" :md="5" style="padding-right:0">
        <el-input placeholder="" v-model="node.ephemeralOwner" size="small" disabled>
          <template slot="prepend">ephemeralOwner</template>
        </el-input>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :sm="5" :md="5" style="padding-right:0">
        <el-input placeholder="" v-model="node.numChildren" size="small" disabled>
          <template slot="prepend">Number Children</template>
        </el-input>
      </el-col>
      <el-col :sm="5" :md="5">
        <el-input placeholder="" v-model="node.dataLength" size="small" disabled>
          <template slot="prepend">Data Length</template>
        </el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-button type="primary" icon="el-icon-edit" size="small" round>Modify Value</el-button>
      <el-button type="primary" icon="el-icon-edit" size="small" round>Modify ACL</el-button>
    </el-row>
    <el-row>
      <el-col :sm="18" :md="18">
        <strong>Value:</strong>
        <el-input type="textarea" :rows="6" v-model="node.data" disabled></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :sm="19" :md="19">
        <strong>Console:</strong><i class="el-icon-delete" @click="handleLoggerClear" style="float:right"></i>
        <!-- <el-input type="textarea" :rows="12" v-model="log" disabled></el-input> -->
        <vue-html5-editor :content="log" :auto-height="false"></vue-html5-editor>
      </el-col>
    </el-row>
  </div>   
</template>

<script>
var zookeeper = require("node-zookeeper-client");
var logger = require("../../main/components/common/logger");

export default {
  data() {
    return {};
  },
  created() {},
  computed: {
    count() {
      return this.$store.state.Counter.main;
    },
    node() {
      return this.$store.state.NodeInfo.node;
    },
    log() {
      return this.$store.state.Logger.log;
    },
    breadcrumbs() {
      var array = ["ROOT"];
      if (this.$store.state.NodeInfo.node.path !== undefined) {
        array = this.$store.state.NodeInfo.node.path.split("/");
        array[0] = "ROOT";
      }
      return array;
    }
  },
  methods: {
    handleLoggerClear() {
      var vm = this;
      logger.clear(vm);
    },
    open(link) {
      this.$electron.shell.openExternal(link);
    }
  }
};
</script>

<<style>

.content {
  width: 100%;
  padding-left:0;
  overflow:auto
}
.content #breadcrumb {
  margin-bottom: 10px;
  border-bottom: 1px solid grey;
}

.content .el-row {
  margin-top: 10px;
}

.content .el-breadcrumb {
  color: black;
  margin-top: 20px;
  margin-bottom: 10px;
}

.content .btn {
  font-size: 0.8em;
  cursor: pointer;
  outline: none;
  padding: 0.75em 2em;
  border-radius: 2em;
  display: inline-block;
  color: #fff;
  background-color: #4fc08d;
  transition: all 0.15s ease;
  box-sizing: border-box;
  border: 1px solid #4fc08d;
}

.content .btn.alt {
  color: #42b983;
  background-color: transparent;
}

.vue-html5-editor{
  margin-bottom:5px;
}

.vue-html5-editor>.content {
  padding-top: 0;
  font-size: 14px;
}

.vue-html5-editor>.content p {
  margin:0;
  padding:0;
}
</style>
