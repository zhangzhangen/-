<template>
 <div>
    <el-table
    :data="table"
    :border='true'
    style="width: 100%" class="tab">
    <el-table-column type="expand">
      <template slot-scope="props">
         <el-form label-position="left"  class="demo-table-expand" label-width='150px'>
              <el-form-item label="商品名称">
                <span>{{ props.row.goods_name }}</span>
              </el-form-item>
              <el-form-item label="价格">
                <span>{{ props.row.goods_price + '.00' }}</span>
              </el-form-item>
              <el-form-item label="库存">
                <span>{{ props.row.goods_number }}</span>
              </el-form-item>
              <el-form-item label="重量">
                <span>{{ props.row.goods_weight }}</span>
              </el-form-item>
              <el-form-item label="商品状态">
                <!-- <span>{{ props.row.goods_state }}</span> -->
                <span>已审核</span>
              </el-form-item>
              <el-form-item label="添加时间">
                <span>{{ props.row.add_time | dateFormat }}</span>
              </el-form-item>
              <el-form-item label="更新时间">
                <span>{{ props.row.upd_time | dateFormat }}</span>
              </el-form-item>
              <el-form-item label="是否是热销品">
                <i style="color:green;font-size:18px;" v-if="props.row.is_promote" class="el-icon-success"></i>
                <i style="color:red;font-size:18px;" v-else class="el-icon-error"></i>
              </el-form-item>
              <el-form-item label="热销品数量">
                <span>{{ props.row.hot_mumber }}</span>
              </el-form-item>
            </el-form>
      </template>
    </el-table-column>
    <el-table-column
      label="#"
      type='index'
      prop="index">
    </el-table-column>
    <el-table-column
      label="商品名称"
      prop="goods_name">
    </el-table-column>
    <el-table-column
      label="商品价格(元)"
      width="105px"
      prop="goods_price">
    </el-table-column>
    <el-table-column
      label="商品重量(克)"
      width="105px"
      prop="goods_number">
    </el-table-column>
    <el-table-column
      label="创建时间"
      width="165px"
     >
     <template slot-scope="scope">{{scope.row.add_time | dateFormat}}</template>
    </el-table-column>
    <el-table-column
    width="180px"
      label="操作"
      prop="desc">
      <template slot-scope="scope">
          <el-button type="success"  icon="el-icon-edit" size="small" @click="revise(scope.row)">编辑</el-button>
          <el-button type="danger"  icon="el-icon-delete" size="small" @click="deletee(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <goodxiu :dia='dia' :user='user'></goodxiu>
 </div>
</template>

<style  >
.tab.tab .el-form-item__label{
  margin-left: 50px;
}
 .tab.tab .demo-table-expand {
    font-size: 0;
  }
 .tab .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .tab .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>

<script>
import goodxiu from '../components/childer/goodxiu.vue'
  export default {
    components:{goodxiu},
    props:['table'],
    methods: {
      cancel(){
        console.log(31231)
          this.dia=false  
      },
      revise(row){
          this.user = row
          console.log(row)
          this.dia=true
      },
     async succer(row){
       let  res =await this.http(this.api.goods+'/'+row.goods_id,{},'get')
       await this.http(this.api.goods+'/'+row.goods_id,res.data.data,'put')
       this.$emit('search')
       this.dia=false 
      },
      deletee(row){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          
          await this.http(this.api.goods+'/'+row.goods_id,{},'delete',{})
           this.$emit('search')
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      }
    },
    data() {
      return {
        dia:false,user:[]
      }
    }
  }
</script>