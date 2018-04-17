<template>
  <div id="wrapper">
    <el-row>
      <el-col :span="24">
        <div class="header">
          <img id="logo" src="~@/assets/logo.jpg" alt="electron-vue">
        </div>
      </el-col>
    </el-row>
    <main>
      <el-row :gutter="20" style="margin:0">
        <el-tabs type="card" v-if="hosts.length > 0">
          <el-tab-pane :key="host.address" v-for="host in hosts">
            <span slot="label"><i class="el-icon-date"></i> {{host.name}}</span>
            <el-col :xs="4" :sm="4" :md="6" :lg="6" :xl="6" style="border-right: 1px solid grey;overflow:scroll;">
              <node-nav v-bind:style="{height: winHeight}"></node-nav>
            </el-col>      
            <el-col :xs="20" :sm="20" :md="18" :lg="18" :xl="18" class="contentCol" style="padding-left: 30px;padding-right: 0;">
              <content-view v-bind:style="{height: winHeight}"></content-view>
            </el-col> 
          </el-tab-pane>
        </el-tabs>
        <el-col v-else>
          <new-connection v-bind:style="{height: winHeight}"></new-connection>
        </el-col>
      </el-row>
    </main>
    <!-- <webview id="foo" src="https://www.github.com/" style="display:inline-flex; width:640px; height:480px"></webview> -->

  </div>
</template>

<script>
import NodeNav from "./NodeNav";
import ContentView from "./ContentView";
import NewConnection from "./NewConnection";

export default {
  name: "landing-page",
  data() {
    return {
      winHeight: window.innerHeight - 103 + "px"
    };
  },
  mounted() {
    window.onresize = function windowResize() {
      this.winHeight = window.innerHeight - 103 + "px";
    };
  },
  computed: {
    hosts() {
      return this.$store.state.Address.hosts;
    }
  },
  components: { NodeNav, ContentView, NewConnection },
  methods: {}
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro");

body {
  font-family: "Source Sans Pro", sans-serif;
  width: 100%;
  height: 100%;
  margin: 0;
}

#wrapper {
  background: radial-gradient(
    ellipse at top left,
    rgba(255, 255, 255, 1) 40%,
    rgba(229, 229, 229, 0.9) 100%
  );
  height: 100%;
  padding: 0px;
}

.header {
  border-bottom: 1px solid green;
}

#logo {
  height: 50px;
  margin-bottom: 5px;
}

main {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
}

.el-row {
  width: 100%;
}

/* .el-tabs {
  width: 100%;
  height: 100%;
} */

.el-col {
  border: none;
  margin: 0;
  height: 100%;
}

.el-tabs__header {
  margin: 0;
}

.el-tab-pane {
  border-top: 1px solid green;
}
</style>
