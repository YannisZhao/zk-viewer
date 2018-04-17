<template>
  <div id="new">
    <el-button round @click="dialogNewVisible = true">新连接</el-button>
    <new-connection-dialog :hidden.sync="dialogNewVisible"></new-connection-dialog>
    <!-- <el-dialog title="新连接" :visible.sync="dialogNewVisible">
      <el-form :model="host">
        <el-form-item label="名称" :label-width="inputWidth">
          <el-input v-model="host.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址" :label-width="inputWidth">
          <el-input v-model="host.address" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogNewVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogNewVisible = false">确 定</el-button>
      </div>
    </el-dialog> -->
  </div>
</template>

<script>
import NewConnectionDialog from "./model/NewConnectionDialog";

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
      "dialogNewVisible": false,
      "host": {
        "name": '',
        "address": ''
      },
      "inputWidth": "120px"
    };
  },
  components: { NewConnectionDialog }
};
</script>

<<style>
#new {
  width:100%;
}
#new > .el-button {
  position:absolute;
  left:50%;
  -webkit-transform:translateX(-50%);
  transform:translateX(-50%);
  top:30%;
  -webkit-transform:translateY(-30%);
  transform:translateY(-30%);
}
</style>
