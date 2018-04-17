<template>
  <div id="app">
    <transition name='fade' appear>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: "zk-viewer"
};
</script>

<style>
#app {
  width: 100%;
  height: 100%;
}
</style>
