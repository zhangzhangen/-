<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card bottom">
       <div class="seach">
         <div class="seach-left">
            <el-input v-model="input"  placeholder="请输入内容" clearable @clear="search"></el-input>
            <el-button type="info" plain icon="el-icon-search" style="margin-left:-3px;" @click = "search"></el-button>
         </div>
          <el-button type="primary" @click='routerup'>用户添加</el-button>
       </div>
       <usertable @search='search' :table = 'table' ></usertable>
    </el-card>
    <usersadd></usersadd> 
    
  </div>
</template>
<script>
import usertable from '../components/goodtable.vue'
import usersadd from  '../components/childer/usersadd.vue'
import goodxiu from '../components/childer/goodxiu.vue'
export default ({
  components:{usertable,usersadd,goodxiu},
  data(){
    return {
      input:'',table:[],addshow:false
    }
  },
async created(){
      let data = {query:'',pagenum :1,pagesize: 5}
      let res = await this.http(this.api.goods,{},'GET',data)
      this.table = res.data.data.goods
      console.log(this.table)
  },
  methods:{
    routerup(){
      this.$router.push('/goods/add')    },

   async search(){
      let data = {query:this.input,pagenum :1,pagesize: 5}
      let res = await this.http(this.api.goods,{},'GET',data) 
      this.table = res.data.data.goods
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