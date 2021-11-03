<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card bottom">
       <div class="seach">
         <div class="seach-left">
            <el-input v-model="input"  placeholder="请输入内容" clearable @clear="search"></el-input>
            <el-button type="info" plain icon="el-icon-search" style="margin-left:-3px;" @click = "search"></el-button>
         </div>
          <el-button type="primary" @click ="addshow=true">用户添加</el-button>
       </div>
       <usertable :table = 'table' @search='search'></usertable>
    </el-card>
    <usersadd :dialogFormVisible='addshow' @adduse='adduse' @search='search'></usersadd> 
  </div>
</template>
<script>
import usertable from '../components/usertable.vue'
import usersadd from  '../components/childer/usersadd.vue'
export default ({
  components:{usertable,usersadd},
  data(){
    return {
      input:'',table:[],addshow:false,
    }
  },
async created(){
    let data = {query:'',pagenum :1,pagesize: 10}
   let res = await this.http(this.api.users,{},'GET',data)
      this.table = res.data.data
  },
  methods:{
   async search(){
      let data = {query:this.input,pagenum :1,pagesize: 10}
      let res = await this.http(this.api.users,{},'GET',data) 
      this.table = res.data.data
      console.log(this.table)
  },
 async adduse(i){
    let res = await this.http(this.api.users,i,'POST')
    this.addshow = false
    this.search()
    
    }
  }
})
</script>

<style scoped lang="scss">
.seach{
  display: flex;
  padding-bottom: 15px;
}
.seach-left{
  width: 460px;
  display: flex;
  margin-right: 20px;
}
.bottom {
  width: 100%;
  box-sizing: border-box;
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