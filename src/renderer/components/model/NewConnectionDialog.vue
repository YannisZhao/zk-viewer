<template>
  <div>
    <el-dialog title="新连接" :visible.sync="visible">
      <el-form :model="host">
        <el-form-item label="名称" :label-width="inputWidth">
          <el-input type="string" clearable v-model="host.name" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="地址" :label-width="inputWidth">
          <el-input type="string" clearable v-model="host.address" placeholder="请输入地址" @keyup.enter.native="submitForm('form')"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="submitForm('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "NewConnectionDialog",
  data() {
    return {
      visible: this.hidden,
      host: {
        name: "",
        address: ""
      },
      inputWidth: "120px"
    };
  },
  props: {
    hidden: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    hidden(val) {
      this.visible = val;
    }
  },
  methods: {
    submitForm(form) {
      var vm = this;

      if (vm.host.address === undefined || vm.host.address === "") {
        this.$message({
          showClose: true,
          message: "请填写服务器地址",
          type: "error"
        });
        return;
      }
      if (vm.host.name === undefined || vm.host.name === "") {
        vm.host.name = vm.host.address;
      }
      vm.addHost(vm.host);
    },
    cancel() {
      this.$emit("update:hidden", false);
    },
    addHost(host) {
      var vm = this;
      vm.$store.commit("ADD_HOST", host);
    }
  }
};
</script>

<style>

</style>
