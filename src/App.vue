<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "App",
  beforeCreate() {}
};
</script>
<style>
body{
  margin: 0px;
}
#app {
  overflow: hidden;
}
</style>

