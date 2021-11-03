<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card bottom">
      <div class="seach">
        <div class="seach-left">
          <el-input
            v-model="input"
            placeholder="请输入内容"
            clearable
            @clear="search"
          ></el-input>
          <el-button
            type="info"
            plain
            icon="el-icon-search"
            style="margin-left: -3px"
            @click="search"
          ></el-button>
        </div>
      </div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column fixed prop="index" label="#" width="60" type="index">
        </el-table-column>
        <el-table-column prop="order_number" label="订单编号">
        </el-table-column>
        <el-table-column prop="order_price" label="订单价格">
        </el-table-column>
        <el-table-column prop="pay_status" label="是否付款">
            <template slot-scope="scope">
                <el-button type="warning"  v-if="scope.row.pay_status" size="small" plain>未付款</el-button>
                <el-button type="success" v-else size="small" plain>已付款</el-button>
           </template>
        </el-table-column>
        <el-table-column prop="is_send" label="是否发货">
        </el-table-column>
        <el-table-column prop="zip" label="下单时间">
           <template slot-scope="scope">
             {{scope.row.create_time|dateFormat}}
           </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit"  size="small" round @click="handleClick(scope.row)"
              ></el-button
            >
            <el-button type="success" size="small" icon="el-icon-s-help" round></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
export default {
 async created(){
    let data = {pagenum:this.pagenum,pagesize:this.pagesize}
    let res = await this.http(this.api.orders,{},'GET',data)
    console.log(res.data.data)
    this.tableData = res.data.data.goods
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
    async search() {
      let data = { query: this.input, pagenum: 1, pagesize: 5 };
      let res = await this.http(this.api.goods, {}, "GET", data);
      this.table = res.data.data.goods;
    },
      handleClick(row) {
        console.log(row);
      }
  },
};
</script>
<style scoped lang="scss">
::v-deep .el-card__body {
  padding: 0;
}
.seach {
  display: flex;
  padding-bottom: 15px;
}
.seach-left {
  width: 460px;
  display: flex;
  margin-right: 20px;
}
.bottom {
  width: 100%;
  box-sizing: border-box;
  padding: 20px;
  background-color: white;
  margin-top: 15px;
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