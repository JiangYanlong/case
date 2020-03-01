<template>
  <div style="height:100%;">
    <gis-map></gis-map>
    <div class="box">
      <div class="content-box">
        <div class="btn-box">
          <div class="btn-box-inner">推荐预案</div>
        </div>
        <ul class="list-box" v-loading="loadingSuggest">
          <li class="list-box-item" v-for="(item,index) in arrSuggset"  :key='index'>
            <div class="item-left">
              <p class="item-left-inner">{{(index+1)}}.{{item.name}}</p>
              <p class="item-left-inner">
                关键词：
                <span v-if="item.keywords==''||item.keywords==null">--</span>
                <span v-else>
                  <el-tag  effect="dark"  v-for="(itemA,indexA) in item.keywordList"  :key="index+'-'+indexA">{{itemA}}</el-tag>
                </span>
              </p>
            </div>
            <div class="item-right">
              <p class="item-right-text">
                <i class="el-icon-office-building"></i>
                <span>{{item.planCategoryName}}</span>
              </p>
              <p class="item-right-btn">
                <el-button size="mini" type="primary"  @click="caseStartDialog(item,'suggest')">启动</el-button>
              </p>
            </div>
          </li>
        </ul>
        <div class="btn-box">
          <el-row>
            <el-col :span="10">
              <div class="btn-box-inner">更多预案</div>
            </el-col>
            <el-col :span="14">
              <div class="search-box-inner">
                <el-input
                  size="medium"
                  placeholder="预案搜索">
                  <i slot="suffix" class="el-input__icon el-icon-search" @click="searchMore()"></i>
                </el-input>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="link-box">
          <a>全部</a>
          <a>风控围捕类</a>
          <a>群体事件类</a>
          <a>刑事案件类</a>
        </div>
        <ul class="list-box" v-loading="loadingMore" >
          <li class="list-box-item" v-for="(item,index) in arrMore" :key="index">
            <div class="item-left">
              <p class="item-left-inner">{{(index+1)}}.{{item.name}}</p>
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
                <i class="el-icon-office-building"></i>
                <span>{{item.planCategoryName}}</span>
              </p>
              <p class="item-right-btn">
                <el-button size="mini" type="primary" @click="caseStartDialog(item,'more')">启动</el-button>
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
    </div>
    <!-- 启动按钮对话框 -->
    <case-start-dialog ref="isCaseStartDialog" :caseStartData="toCaseStartData"></case-start-dialog>
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
    .btn-box{
      padding-top: 20px;
      padding-bottom: 20px;
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
    .btn-box:nth-child(3){
      .btn-box-inner{
        background-color: #375C7C;
      }
    }
    .list-box{
      .list-box-item:hover{
        border: 1px solid #076DC1;
        transition:border 0.25s ease ;
        .item-right-text{

          display: none;
        }
        .item-right {
          .item-right-btn{
            display: block;
            transition:display 0.1s ease ;
          }
        }
      }
      .list-box-item{
        background-color: #132434;
        box-sizing: border-box;
        height: 100px;
        margin-bottom: 20px;
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
          color: #7592BB;
          display: inline-block;
          width: 20%;
          float: left;
          height: 100px;
          line-height: 100px;
          box-sizing: border-box;
          .item-right-btn{
            display: none;
          }
          p{
            text-align: right;
            overflow:hidden;
            white-space:nowrap;
            text-overflow:ellipsis;
            font-size: 12px;
            i{
              font-size: 17px;
              vertical-align: middle;
            }
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
  import gisMap from "../gis/map";
  import { prePlanInstcApi } from "@/api/prePlanInstcApi.js";
  import caseStartDialog from "./caseStartDialog.vue";
  export default {
    data(){
        return{
          arrSuggset:[],
          loadingSuggest:true,
          arrMore:[],
          loadingMore:true,
          formInline: {
            pageIndex: 0,
            pageSize: 2,
            planCategory: "", //预案种类
            planType: "", //预案类型
            keyword: "" //搜搜关键字
          },
          total: 0,
          isCaseStartDialog:false,
          toCaseStartData:{}
        };
      },
    methods:{
      caseStartDialog(item,str){
        console.log(item)
        this.toCaseStartData = item;
        this.toCaseStartData.caseType=str;
        this.$nextTick(()=>{
          this.$refs.isCaseStartDialog.openDialog();
        })
      },
      searchSugget(){
        let params = {
          pageIndex: 0,
          pageSize: 3,
          keyword: ""
        };
        prePlanInstcApi.searchPlanListSuggest(params).then(res=>{
          if(res.data.resultCode==0){
            this.arrSuggset = res.data.data.data
          }else{
            this.$message({
              showClose: true,
              message: res.data.resultMessage,
              type: "error"
            });
          }
        }).finally(()=>{
          this.loadingSuggest= false;
        });
      },
      searchMore(){
        this.loadingMore = true;
        let params = this.formInline;
        prePlanInstcApi.searchPlanList(params).then(res => {
          if (res.data.resultCode == 0) {
            this.arrMore = res.data.data.data;
            this.total = res.data.data.recordTotal;
          } else {
            this.$message({
              showClose: true,
              message: res.data.resultMessage,
              type: "error"
            });
          }
        }).finally(()=>{
          this.loadingMore=false;
        });
      },
      handleCurrentChange(){
        this.searchMore();
      }
    },
    created(){
      this.searchSugget();
      this.searchMore();
    },
    components: {
      gisMap,
      caseStartDialog
    }
  }
</script>
