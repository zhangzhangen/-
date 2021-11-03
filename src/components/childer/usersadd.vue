<template>
  <div>
    <el-dialog title="修改用戶信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="用戶名" :label-width="formLabelWidth">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
         <el-form-item label="邮箱号" :label-width="formLabelWidth">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
         <el-form-item label="手机" :label-width="formLabelWidth">
          <el-input v-model="form.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="$parent.addshow=false">取 消</el-button>
        <el-button type="primary" @click="$emit('adduse',form)"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
     props:['dialogFormVisible'],
  data() {
    return {
      form: {
       mobile:'',email:'',password:'',username:''
      },
      formLabelWidth: "120px",
    };
  },
};
</script>