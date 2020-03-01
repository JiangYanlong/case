<template>
<div>
    <el-dialog custom-class="case-dialog" title="启动预案" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
        <el-form ref="form" :model="form" label-width="180px">
            <el-form-item label="请输入业务事件编号"
                prop="bizRelId"
                :rules="[{ required: true, message: '请输入业务事件编号', trigger: 'blur' }]">
                <el-input v-model="form.bizRelId"></el-input>
            </el-form-item>
            <el-form-item class="form-btn-box">
                <el-button type="primary" @click="onSubmit('form')">确定</el-button>
                <el-button @click="handleClose()">取消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</div>
</template>
<script>
  import { prePlanInstcApi } from "@/api/prePlanInstcApi.js";
export default {
  name: "caseStartDialog",
  props: ["caseStartData"],
  data() {
    return {
        dialogVisible: false,
        form:{
          bizRelId:""
        }
    };
  },
  components: {
  },
  created() {
  },
  methods: {
    openDialog() {
        this.dialogVisible = true;
    },
    handleClose(){
      this.resetForm('form');
      this.dialogVisible = false;
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    onSubmit(formName){
      let _self = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = {
            bizRelId: _self.form.bizRelId,
            planTmplId: _self.caseStartData.id
          };
          prePlanInstcApi.startPlan(data).then(res => {
            if(res.data.resultCode==0){
              this.$message({
                message: '启动成功！',
                type: 'success'
              });
              _self.handleClose();
              if(_self.caseStartData.caseType=="suggest"){
                _self.$parent.searchSugget();
              }else {
                _self.$parent.searchMore();
              }
            }else {
              this.$message({
                message: res.data.resultMessage,
                type: 'error'
              });
            }
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
};
</script>
