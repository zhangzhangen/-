<template>
  <div>
    <el-dialog title="分配权限" :visible.sync="$parent.show">
      <el-form :model="form">
        <div><span>当前的用户 : {{mess.username}} </span><span></span></div>
        <div style="padding:20px 0;"><span>当前的角色 : {{mess.role_name}}</span><span></span></div>
        <el-form-item label="分配新的角色 : ">
          <el-select v-model="form.region" placeholder="分配新角色">
            <el-option :label="item.roleName" :value="item.roleDesc" v-for="item in roles" :key='item.id'></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="$parent.show = false">取 消</el-button>
        <el-button type="primary" @click="succer"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["show",'mess'],
  data() {
    return {
        form: {region:''},roles:[],
    };
  },
async  created(){
        let res = await this.http(this.api.roles)
        console.log(res.data.data)
        this.roles = res.data.data
  },
  methods:{
    async succer(){
        this.$parent.show = false;
        if(this.form.region){
            let index=this.roles.findIndex(v=>v.roleDesc==this.form.region)
             let data = {rid:this.roles[index].id}
             let res = await this.http(this.api.users+'/'+this.mess.id+'/role',data,'put',{})
             this.$parent.paren()
        }
        this.form.region = ''
      }
  }
};
</script>