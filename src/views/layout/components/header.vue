<template>
  <div class="header">
    <el-button @click="drawer = true" type="primary" icon="el-icon-s-unfold"></el-button>
    <el-drawer
      direction="ltr"
      :append-to-body=true
      :visible.sync="drawer"
      :before-close="drawerClose"
      :with-header=true>
      <el-row class="tac">
          <el-menu
            default-active="caseStart"
            @open="handleOpen"
            @close="handleClose" router>
            <el-menu-item index="caseStart">
              <i class="el-icon-location"></i>
              <span slot="title">启动预案</span>
            </el-menu-item>
            <el-menu-item index="caseTmp">
              <i class="el-icon-menu"></i>
              <span slot="title">预案模板</span>
            </el-menu-item>
            <el-menu-item index="casePre">
              <i class="el-icon-setting"></i>
              <span slot="title">预案实例</span>
            </el-menu-item>
          </el-menu>
      </el-row>

    </el-drawer>
    <span>启动预案</span>
  </div>
</template>

<script>
  export default {
    components: {
    },
    data() {
      return {
        drawer: false,//侧边菜单栏
      };
    },
    methods: {

      //侧边菜单栏事件
      drawerClose(done) {
        done();
        console.log("侧边菜单栏关闭。")
      },
      //菜单事件
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  };
</script>

<style lang="scss" scoped>
  .header{
    background-color: #283645;
    height: 70px;
    line-height: 70px;
    color: #FFF;
    font-size: 36px;
    text-align: center;
    .el-button--primary{
      color: #FFF;
      background-color: transparent;
      border-color: transparent;
      border: none;
      font-size: 36px;
      vertical-align: middle;
      float: left;
      margin-top: 5px;
    }
    .el-menu{
      border-right-color: transparent;
    }

  }
  .enc-drawer{
  }
</style>
