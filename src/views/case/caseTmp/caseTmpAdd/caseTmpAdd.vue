<template>
  <div class="form-container">
        <div class="form-box">
          <div class="content-top">
            <el-form :inline="true" ref="formInline" :model="formInline" labelPosition="left" label-width="90px" class="demo-form-inline">
              <el-row>
                <el-col :span="12">
                  <el-form-item
                    label="预案名称："
                    prop="name"
                    :rules="[{ required: true, message: '请输入预案名称', trigger: 'blur' }]">
                    <el-input v-model="formInline.name" placeholder="预案名称"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item
                    label="关键词："
                    prop="keywordStr"
                    :rules="[{ required: true, message: '请输入关键词', trigger: 'blur' }]">
                    <el-input v-model="formInline.keywordStr" placeholder="关键词"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item
                    label="预案种类："
                    prop="planCategory"
                    :rules="[{ required: true, message: '请选择预案种类', trigger: 'blur' }]">
                    <el-select v-model="formInline.planCategory" placeholder="请选择预案种类">
                      <el-option
                        v-for="item in arrPlanCategory"
                        :key="item.dictCode"
                        :label="item.dictValue"
                        :value="item.dictCode"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item
                    label="预案类型："
                    prop="planType"
                    :rules="[{ required: true, message: '请选择预案类型', trigger: 'blur' }]">
                    <el-select v-model="formInline.planType" placeholder="请选择预案类型">
                      <el-option
                        v-for="item in arrPlanType"
                        :key="item.dictCode"
                        :label="item.dictValue"
                        :value="item.dictCode"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item
                    label="有效性："
                    prop="enabled"
                    :rules="[{ required: true, message: '请选择有效性', trigger: 'blur' }]">
                    <el-select v-model="formInline.enabled" placeholder="请选择有效性">
                      <el-option label="有效" value="1"></el-option>
                      <el-option label="无效" value="0"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="附件：" prop="fsFileDtoStr">
                    <el-input v-model="formInline.fsFileDtoStr" placeholder="附件"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="submitForm('formInline')">提交</el-button>
                    <el-button @click="resetForm('formInline')">重置</el-button>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <div class="content-bottom">
            <div class="content-bottom-left">
              <div class="content-bottom-left-inner">
                <p>预案详情</p>
                <p v-for="item in toolData.arrDetail" :key="item.planTmplId"><el-tag closable>{{item.name}}</el-tag></p>
                <p><el-tag @click="caseTmpAddDetailorProcess(1)"><i class="el-icon-plus"></i></el-tag></p>
              </div>
              <div class="content-bottom-left-inner">
                <p>处置过程</p>
                <p v-for="item in toolData.arrProcess" :key="item.planTmplId"><el-tag closable>{{item.name}}</el-tag></p>
                <p><el-tag @click="caseTmpAddDetailorProcess(2)"><i class="el-icon-plus"></i></el-tag></p>
              </div>
            </div>
            <div class="content-bottom-right">
              <div class="content-tool">
                <el-row>
                  <el-col :span="8" class="content-tool-title"><div class="grid-content bg-purple">工具栏</div></el-col>
                  <el-col :span="4" class="content-tool-icon"><i class="el-icon-s-home" @click="caseTmpAddTool()"></i>指挥机构</el-col>
                  <el-col :span="4" class="content-tool-icon"><i class="el-icon-s-data"></i>单位指令</el-col>
                  <el-col :span="4" class="content-tool-icon"><i class="el-icon-s-check"></i>人员指令</el-col>
                  <el-col :span="4" class="content-tool-icon"><i class="el-icon-edit-outline"></i>文本</el-col>
                </el-row>
              </div>
              <div class="content-detail">
                <p>
                  <label>总指挥：</label>
                  <span>市局局长</span>
                  <a>
                    <i class="el-icon-edit"></i>
                    <i class="el-icon-delete"></i>
                  </a>
                </p>
                <p>{{planTmplId}}</p>
              </div>
            </div>
          </div>
        </div>
      <case-tmp-add-item-dialog ref="isCaseTmpAddItemDialog" :caseTmpAddItemData="toCaseTmpAddItemDialog"></case-tmp-add-item-dialog>
    <case-tmp-add-tool-dialog ref="isCaseTmpAddToolDialog" :caseTmpAddToolData="toCaseTmpAddToolData"></case-tmp-add-tool-dialog>
  </div>
</template>

<style lang="scss" scoped>
  .form-container{
    width: 70%;
    height: 100%;
    overflow-y: auto;
    display: inline-block;
    float: left;
    box-sizing: border-box;
    padding-left: 30px;
    position: relative;
    .form-box{
      padding: 20px;
      width: 100%;
      height: 100%;
      background-color: rgba(35,60,81,0.8);
      .content-top{
        background-color: #132434;
        width: 100%;
        line-height: 50px;
        height: 150px;
        border-radius: 5px;
        padding: 0px 30px;
        .el-form-item__label{
          vertical-align: top;
          padding: 0px;
          height: 40px;
          line-height: 40px;
          vertical-align: top;
        }
      }
      .content-bottom{
        width: 100%;
        height: 690px;
        margin-top: 20px;
        padding-left: 180px;
        position: relative;
        .content-bottom-left{
          background-color: #132434;
          width: 160px;
          height: 100%;
          position: absolute;
          top: 0px;
          left: 0px;
          border-radius: 5px;
          .content-bottom-left-inner{
            text-align: center;
            height: 50%;
            padding: 10px 0px;
            p{
              color: #F0F1F2;
              font-size: 16px;
              height: 35px;
              line-height: 35px;
            }
          }
        }
        .content-bottom-right{
          height: 100%;
          .content-tool{
            text-align: center;
            height: 60px;
            line-height: 60px;
            background-color: #132434;
            border-radius: 5px;
            color: #F0F1F2;
            .content-tool-title{
              text-align: left;
              padding-left: 40px;
              color: #0281E9;
            }
            .content-tool-icon{
              padding-right: 40px;
              text-align: right;
            }
          }
          .content-detail{
            background-color: #132434;
            border-radius: 5px;
            height: 610px;
            margin-top: 20px;
            padding: 20px;
            padding-right: 40px;
            p{
              padding-right: 50px;
              position: relative;
              height: 35px;
              line-height: 35px;
              color:#F0F1F2 ;
              border-bottom: 1px dashed #2E3E4C;
              padding-left: 20px;
              a{
                position: absolute;
                right: 0px;
                i:nth-child(1){
                  margin-right: 10px;
                }
              };
            }
          }
        }
      }
    }
  }
</style>
<script>
  import caseTmpAddItemDialog from "./caseTmpAddItemDialog";
  import caseTmpAddToolDialog from "./caseTmpAddToolDialog";
  import { commonApi } from "@/api/commonApi.js";
  import { prePlanTmplApi } from "@/api/prePlanTmplApi.js";
  export default {
    data(){
      return{
        formInline: {
          name: '',         //名称
          keywordStr:'',    //关键词
          keywordList: [],  //关键词数组
          planType:'',      //预案类型
          planCategory:'',  //预案种类
          enabled:'',       //有效性
          fsFileDtoStr:'',  //文件字符串
          fsFileDtoList:[], //文件列表数组
        },
        toolData:{
          arrDetail:[],
          arrProcess:[]
        },
        arrPlanType:[],     //预案类型数组
        arrPlanCategory:[], //预案种类数组
        planTmplId:'',      //预案模板id
        toCaseTmpAddItemDialog:{},//增加预案详情/处置过程数据
        toCaseTmpAddToolData:{},//增加指挥机构等数据
      };
    },
    methods:{

      //查询所有的预案类型
      searchPlanType(){
        let params = {
          pageIndex: 0,
          pageSize: 50,
          parentCode: "1002"
        };
        commonApi.getDictListByParent(params).then(res => {
          if (res.data.resultCode === 0) {
            this.arrPlanType = res.data.data.data;
          }
        });
      },

      //查询所有的预案种类
      searchPlanCategory(){
        let params = {
          pageIndex: 0,
          pageSize: 50,
          parentCode: "1001"
        };
        commonApi.getDictListByParent(params).then(res => {
          if (res.data.resultCode === 0) {
            this.arrPlanCategory = res.data.data.data;
          }
        });

      },

      //提交基本信息
      submitForm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log('submit!');
            let data = {
              enabled: Number(this.formInline.enabled),
              fsFileDtoList: [],
              keywordList: this.formInline.keywordStr.split(","),
              name: this.formInline.name,
              planCategory: this.formInline.planCategory,
              planType: this.formInline.planType,
            };
            prePlanTmplApi.addBasisPlanInfo(data).then(res=>{
              console.log(res)
              if(res.data.resultCode==0){
                this.$message({
                  message: '操作成功！',
                  type: 'success'
                });
                this.$refs.caseTmpList.searchForSys();
                this.planTmplId = res.data.data;
              }else {
                this.$message({
                  message: res.data.resultMessage,
                  type: 'error'
                });
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //重置基本信息
      resetForm(formName){
        this.$refs[formName].resetFields();
      },

      //增加预案详情/处置过程
      caseTmpAddDetailorProcess(infoType){
        this.toCaseTmpAddItemDialog = {
          title:infoType==1?'添加预案详情':'添加处置过程',
          id:'',
          infoType:infoType,
          planTmplId:this.planTmplId
        };
        this.$nextTick(()=>{
          this.$refs.isCaseTmpAddItemDialog.openDialog();
        })
      },
      //查询预案详情/处置过程
      caseTmpSearchDetailorProcess(infoType){
        let data = {
          planTmplId:this.planTmplId,
          infoType:infoType
        }
        prePlanTmplApi.queryPlanStageList(data).then(res=>{
          console.log(res);
          if(res.data.resultCode==0){
            if(infoType==1){
              this.toolData.arrDetail = res.data.data[1];
            }else {
              this.toolData.arrProcess = res.data.data[2];
            }

          }else {
            this.$message({
              message: res.data.resultMessage,
              type: 'error'
            });
          }
        }).finally({

        });
      },


      //增加指挥机构
      caseTmpAddTool(){
        this.$refs.isCaseTmpAddToolDialog.openDialog();

      }
    },
    created(){
      this.searchPlanType();//查询所有的预案类型
      this.searchPlanCategory();//查询所有的预案种类
    },
    components: {
      caseTmpAddItemDialog,
      caseTmpAddToolDialog
    }
  }
</script>
