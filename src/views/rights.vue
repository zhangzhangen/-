<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card bottom">
       <el-table :data="table" border style="width: 100%">
    <el-table-column fixed prop="index" label="#" type=index>
    </el-table-column>
      <el-table-column prop="authName" label="权限名称" > </el-table-column>
      <el-table-column prop="path" label="路径"></el-table-column>
      <el-table-column prop="level" label="权限等级" >
             <template slot-scope="scope">
                <el-button type="primary"  size="mini" v-if="scope.row.level==0">一级</el-button>
                <el-button type="success"  size="mini" v-if="scope.row.level==1">二级</el-button>
                <el-button type="warning"  size="mini" v-if="scope.row.level==2">三级</el-button>
            </template>
      </el-table-column>
    </el-table>
    </el-card>
  </div>
</template>
<script>
export default ({
 async created(){
     let res =await this.http(this.api.rights+'/list')
     this.table = res.data.data
     console.log(res.data.data)
  },
  data(){
    return {
      table:[]
    }
  }
})
</script>

<style scoped lang="scss">
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