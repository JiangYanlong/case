<template>
  <div class="main-layout">
    <enc-header></enc-header>
    <app-main ref="mainTable"/>
  </div>
</template>

<style lang="scss" scoped>
</style>>
<script>
  import encHeader from "./components/header";
  import { AppMain } from "./components";

export default {
  name: "Layout",
  data() {
    return {
    };
  },
  components: {
    encHeader,
    AppMain
  },
  computed: {},
  watch: {
  },
  mounted() {
  },
  methods: {
  }
};
</script>

