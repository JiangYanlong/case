<template>
<div>
    <el-dialog custom-class="case-dialog" :title="caseTmpAddItemData.title" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="名称:"
                prop="name"
                :rules="[{ required: true, message: '请输入名称', trigger: 'blur' }]">
                <el-input v-model="form.name"></el-input>
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
  import { prePlanTmplApi } from "@/api/prePlanTmplApi.js";
export default {
  name: "caseTmpAddItemDialog",
  props: ["caseTmpAddItemData"],
  data() {
    return {
        dialogVisible: false,
        form:{
          name:""
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
        console.log(this.$parent)
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
            "infoType": this.caseTmpAddItemData.infoType,
            "name": this.form.name,
            "planTmplId": this.caseTmpAddItemData.planTmplId
          };
          prePlanTmplApi.addDatailorProcess(data).then(res => {
            if(res.data.resultCode==0){
              this.$message({
                message: '新增成功！',
                type: 'success'
              });
              _self.handleClose();
              this.$parent.caseTmpSearchDetailorProcess(this.caseTmpAddItemData.infoType);

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
