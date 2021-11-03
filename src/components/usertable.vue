<template>
  <div>
    <el-table :data="table.users" border style="width: 100%">
    <el-table-column fixed prop="index" label="#" type=index>
    </el-table-column>
    <el-table-column prop="username" label="用户名" > </el-table-column>
    <el-table-column prop="email" label="邮箱">
    </el-table-column>
    <el-table-column prop="role_name" label="角色" > </el-table-column>
    <el-table-column prop="mobile" label="电话"> </el-table-column>
    <el-table-column prop="zip" label="状态" >
        <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state" active-color="#13ce66" @change="modifyStatus(scope.row)"  inactive-color="#ff4949"></el-switch>
      </template>
    </el-table-column>
    <el-table-column fixed="right" label="操作" >
      <template slot-scope="scope">
          <el-button type="success" round icon="el-icon-edit" size="mini" @click="revise(scope.row)"></el-button>
          <el-button type="warning" round icon="el-icon-s-tools" size="mini" @click="setUp(scope.row)"></el-button>
          <el-button type="danger" round icon="el-icon-delete" size="mini" @click="deletee(scope.row)"></el-button>
      </template>
    </el-table-column>
  </el-table>
  <revise :dialogFormVisible='dialogFormVisible' @succer='succer(user)' @cancel='cancel' :user='user'></revise>
  <assignPermissions :show='show' :mess='mess'></assignPermissions>
  </div>
</template>

<script>
import revise from './childer/revise.vue'
import assignPermissions from './childer/assignPermissions.vue'
export default {
    components:{revise,assignPermissions},
    props:['table',],
    methods: {
      paren(){
         this.$emit('search')
      },
      async modifyStatus(row) {
      let res = await this.http(this.api.users+'/' + row.id + '/state/' + row.mg_state ,{},'PUT')
        if(res.data.meta.msg =='设置状态成功'){
             this.$message({
                message: '更新状态成功',
                type: 'success',
                beforeClose(action, instance, done) {
                  console.log(action, instance, done)
                },
        })
        }else{
            this.$message.error('更新状态失败')
        }
    },
    cancel(){
      this.dialogFormVisible = false
    },
   async succer(conte){
      console.log(conte)
      this.dialogFormVisible = false
      let data = {id:conte.id,email:conte.email,mobile:conte.mobile}
      let res = await this.http(this.api.users+'/'+conte.id,data,'put',{})
      if(res.data.meta.status==200){
        this.$message({
          message: '恭喜你，修改信息成功',
          type: 'success'
        });
      }else{
        this.$message.error('错了哦，修改信息失败');
      }
    },
    revise(row) {
      console.log(row);
     this.user = row
     this.dialogFormVisible = true
    },
    setUp(row) {
      console.log(row)
      this.mess = row
     this.show=true
    },
    deletee(row) {
        this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(async() => {
            this.$message({
            type: 'success',
            message: '删除成功!',
          }); 
         await this.http(this.api.users+'/'+row.id,{},'delete',{})
         this.$emit('search')
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
  },

  data() {
    return {
      tableData: [],
      dialogFormVisible:false ,
      show: false,
      user:{},
      mess:[]
    };
  },
};
</script>