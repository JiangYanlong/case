<template>
<div>
    <el-dialog custom-class="case-dialog" title="添加指挥机构" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
        <el-form ref="form" label-position="left" :model="form" label-width="80px">
            <el-form-item label="名称："
                prop="name"
                :rules="[{ required: true, message: '请输入名称', trigger: 'blur' }]">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item
              label="责任人："
              prop="executorId"
              :rules="[{ required: true, message: '请选择', trigger: 'blur' }]">
              <el-tree
                :data="arrOrgans"
                :props="defaultProps"
                show-checkbox
                node-key="id"
                check-strictly
                ref="treeForm"
                @check-change="handleNodeClick">
              </el-tree>
            </el-form-item>
            <el-form-item
              label=""
              prop="executorId"
              :rules="[{ required: true, message: '请选择', trigger: 'blur' }]">
              <el-select v-model="value1" filterable clearable multiple placeholder="请选择">
                <el-option
                  v-for="item in arrOrgansPeople"
                  :key="item.staffId"
                  :label="item.name"
                  :value="item.staffId">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="备注：" prop="remark">
              <el-input type="textarea" v-model="form.remark"></el-input>
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
  import { commonApi } from "@/api/commonApi.js";
export default {
  name: "caseTmpAddToolDialog",
  props: ["caseTmpAddToolData"],
  data() {
    return {
      dialogVisible: false,
      form:{
        name:'',      //名称
        executorId:'',//责任人
        remark:'',    //备注
      },
      arrOrgans:[],//组织机构数组
      arrOrgansPeople:[],//组织机构内人员

      defaultProps: {
        children: 'children',
        label: 'name'
      },
      options: [],
      value1: [],
    };
  },
  components: {
  },
  created() {
    this.queryOrgans();
  },
  methods: {
    openDialog() {
        this.dialogVisible = true;
        console.log(this.$parent)
    },

    //查询组织机构
    queryOrgans(){
      commonApi.queryOrgansTree().then(res=>{
        console.log(res)
        this.arrOrgans = res.data.data;
      });
    },
    //组织机构变化事件
    handleNodeClick(data, checked, node){
      if(checked === true) {
        this.checkedId = data.id;
        this.$refs.treeForm.setCheckedKeys([data.id]);
      } else {
        if (this.checkedId == data.id) {
          this.$refs.treeForm.setCheckedKeys([data.id]);
        }
      }
      console.log(this.$refs.treeForm.getCheckedNodes());
      let tempArr = this.$refs.treeForm.getCheckedNodes();
      let params={
        orgId:tempArr[0].id
      }
      commonApi.queryPeoplefromOrgan(params).then(res=>{
        console.log(res);
        this.arrOrgansPeople = res.data.data.data;
      })

    },
    handleClose(){
      this.resetForm('form');
      this.dialogVisible = false;
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    onSubmit(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {

        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
};
</script>
