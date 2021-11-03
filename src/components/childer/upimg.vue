<template>
  <div>
    <el-upload
      :action="api.upload"
      :headers="header"
      list-type="picture-card"
      :on-success ='success'
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      header:{
        Authorization:sessionStorage.getItem('token')
      }
    };
  },
  methods: {
    success(file, fileList) {
      this.$emit('success',file.data.url)
    }
  },
};
</script>