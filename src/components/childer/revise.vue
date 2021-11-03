<template>
  <div>
    <el-dialog title="修改用戶信息" :visible.sync="dialogFormVisible">
      <el-form :model="user">
        <el-form-item label="用戶名" :label-width="formLabelWidth">
          <el-input v-model="user.username"  :disabled="true"></el-input>
        </el-form-item>
         <el-form-item label="邮箱号" :label-width="formLabelWidth">
          <el-input v-model="user.email"></el-input>
        </el-form-item>
         <el-form-item label="手机" :label-width="formLabelWidth">
          <el-input v-model="user.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="$emit('cancel')">取 消</el-button>
        <el-button type="primary" @click="$emit('cancel'),$emit('succer',user)"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
    props:['dialogFormVisible','user'],
  data() {
    return {
      formLabelWidth: "120px",
    };
  },
};
</script>