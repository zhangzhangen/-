<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card bottom">
        <el-button type="primary">添加分类</el-button>
        
    </el-card>
  </div>
</template>
<script>
export default {
  async created(){
    let data = {pagenum:this.pagenum,pagesize:this.pagesize,type:3}
    let res = await this.http(this.api.categories,{},'GET',data)
    console.log(res.data.data)
    this.tableData = res.data.data.result
  },
  data() {
    return {
      input: "",
      tableData:[],
      pagenum:1,
      pagesize:5
    };
  },
  methods: {
      handleClick(row) {
        console.log(row);
      }
  },
};
</script>
<style scoped lang="scss">
::v-deep .el-result__icon svg{
  width:25px;
  height: 25px;
  opacity: 0.7;
}
::v-deep .el-result {
  padding: 0;
  display: block;
  text-align: left;
}
::v-deep .el-table{
  margin-top:15px;
}
::v-deep .el-card__body {
  padding: 0;
}
.bottom {
  width: 100%;
  box-sizing: border-box;
  padding: 20px;
  background-color: white;
  margin-top:15px;
}
</style>
<style>
  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .box-card {
    width: 480px;
  }
</style>