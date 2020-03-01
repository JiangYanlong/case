<template>
    <div class="content-box">
      <div class="link-box">
        <a>全部</a>
        <a>风控围捕类</a>
        <a>群体事件类</a>
        <a>刑事案件类</a>
      </div>
      <div class="btn-box">
        <el-row>
          <el-col :span="14">
            <div class="search-box-inner">
              <el-input
                size="medium"
                placeholder="预案搜索">
                <i slot="prefix" class="el-input__icon el-icon-search" @click="searchForSys()"></i>
              </el-input>
            </div>
          </el-col>
          <el-col :span="10" style="padding-left: 10px;">
            <el-button type="primary">添加</el-button>
          </el-col>

        </el-row>
      </div>
      <ul class="list-box" v-loading="loadingSearchForSys" >
        <li class="list-box-item" v-for="(item,index) in arrSearchForSys" :key="index">
          <div class="item-left">
            <p class="item-left-inner">【{{item.enabled?"有效":"无效"}}】{{item.name}}</p>
            <p class="item-left-inner">
              关键词：
              <span v-if="item.keywords==''||item.keywords==null">--</span>
              <span v-else>
                <el-tag  effect="dark" v-for="(itemA,indexA) in item.keywordList"  :key="index+'-'+indexA">{{itemA}}</el-tag>
              </span>
            </p>
          </div>
          <div class="item-right">
            <p class="item-right-text">
              <span>{{item.createdDate}}</span>
            </p>
            <p class="item-right-text">
              <i class="el-icon-office-building"></i>
              <span>{{item.planCategoryName}}</span>
            </p>
          </div>
        </li>

      </ul>
      <div class="page-box">
        <el-pagination
          layout="prev, pager, next"
          :background=true
          :page-size="formInline.pageSize"
          :current-page.sync="formInline.pageIndex"
          :total="total"
          @current-change="handleCurrentChange">
        </el-pagination>
      </div>
    </div>
</template>

<style lang="scss" scoped>
  .content-box{
    padding-left: 20px;
    padding-right: 20px;
    width: 30%;
    height: 100%;
    position: relative;
    background-color: rgba(35,60,81,0.8);
    overflow-y: auto;
    display: inline-block;
    float: left;
    box-sizing: border-box;
    .btn-box{
      padding-top: 20px;
      padding-bottom: 20px;
      height: 36px;
      line-height: 36px;
      .btn-box-inner{
        height: 35px;
        line-height: 34px;
        background-color: rgba(23,126,108,0.9);
        border-radius: 20px;
        width: 110px;
        color: #DEEDEA;
        text-align: center;
      }
    }
    .list-box{
      .list-box-item:hover{
        border: 1px solid #076DC1;
        transition:border 0.25s ease ;
      }
      .list-box-item{
        background-color: #132434;
        box-sizing: border-box;
        height: 100px;
        margin-bottom: 15px;
        border-radius: 5px;
        padding-left: 15px;
        padding-right: 15px;
        .item-left{
          display: inline-block;
          width: 80%;
          float: left;
          .item-left-inner{
            overflow:hidden;
            white-space:nowrap;
            text-overflow:ellipsis;
            height: 50px;
            line-height: 50px;
            color: #F0F1F2;
            box-sizing: border-box;
          }
          .item-left-inner:nth-child(2){
            font-size: 12px;
          }
        }
        .item-right{
          color: #F0F1F2;
          display: inline-block;
          width: 20%;
          float: left;
          height: 100px;
          line-height: 50px;
          box-sizing: border-box;
          .item-right-btn{
            display: none;
          }
          p{
            text-align: center;
            overflow:hidden;
            white-space:nowrap;
            text-overflow:ellipsis;
            i{
              font-size: 17px;
              vertical-align: middle;
            }
          }
          p:nth-child(2){
            font-size: 12px;
            color: #7592BB;
          }
        }
      }
    }
    .link-box{
      line-height: 45px;
      color: #0285F1;
      a{
        padding: 0px 10px;
        text-decoration: underline;
      }
    }
    .page-box{
      text-align: right;
      margin-top: 30px;
    }
  }

</style>
<script>
  import { prePlanTmplApi } from "@/api/prePlanTmplApi.js";
  export default {
    data(){
      return{
        arrSearchForSys:[],
        loadingSearchForSys:true,
        formInline: {
          pageIndex: 0,
          pageSize: 6,
          planCategory: "", //预案种类
          planType: "", //预案类型
          keyword: "" //搜搜关键字
        },
        total: 0,
      };
    },
    methods:{
      searchForSys(){
        this.loadingMore = true;
        let params = this.formInline;
        prePlanTmplApi.searchAllPlanList(params).then(res => {
          if (res.data.resultCode == 0) {
            this.arrSearchForSys = res.data.data.data;
            this.total = res.data.data.recordTotal;
          } else {
            this.$message({
              showClose: true,
              message: res.data.resultMessage,
              type: "error"
            });
          }
        }).finally(()=>{
          this.loadingSearchForSys=false;
        });
      },
      handleCurrentChange(){
        this.searchForSys();
      }
    },
    created(){
      this.searchForSys();
    },
    components: {
    }
  }
</script>
