<template>
  <div style="height:100%;">
    <gis-map></gis-map>
    <div class="box">
      <case-tmp-list ref="caseTmpList"></case-tmp-list>
      <case-tmp-add></case-tmp-add>
    </div>
  </div>
</template>


<script>
  import gisMap from "../gis/map";
  import caseTmpList from "./caseTmpList";
  import caseTmpAdd from "./caseTmpAdd/caseTmpAdd";
  export default {
    data(){
      return{
      };
    },
    methods:{
    },
    created(){
    },
    components: {
      gisMap,
      caseTmpList,
      caseTmpAdd,
    }
  }
</script>
