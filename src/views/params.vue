<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>分类参数</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card bottom">
      <el-alert
        show-icon
        title="注意: 只允许为第三级分类设置相关参数!"
        type="info"
        effect="dark"
      ></el-alert>
      <div class="block">
        <span class="demonstration">选择商品分类：</span>
        <el-cascader
          @change="checkchange"
          :props="cateProps"
          :options="options"
          v-model="value"
        >
        </el-cascader>
      </div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="动态参数" name="first">
          <el-button type="primary" size="small">添加参数</el-button>
        </el-tab-pane>
        <el-tab-pane label="静态属性" name="second">
          <el-button type="primary" size="small">添加参数</el-button>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>
<script>
export default {
  async created() {
    let res = await this.http(this.api.categories);
    this.options = res.data.data;
  },
  data() {
    return {
      inputVisible: false,
      inputValue: "",
      activeName: "first",
      value: [],
      options: [],
      cateProps: {
        value: "cat_id",
        label: "cat_name",
        children: "children",
      },
      tableData:[]
    };
  },
  methods: {
    handleChange(value) {
      console.log(value);
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    async checkchange() {
      if (this.value.length == 3) {
        let res = await this.http(
          this.api.categories + "/" + this.value[2] + "/attributes?sel=many"
        );
        console.log(res.data.data);
        this.tableData = res.data.data;
      }
    },
    async handleClose(row, tag) {
      let index = this.tableData.findIndex((v) => v == row);
      let rowa = row.attr_vals.split(",");
      rowa.splice(rowa.indexOf(tag), 1);
      let data = {
        attr_vals: rowa.join(","),
        attr_name: row.attr_name,
        attr_sel: row.attr_sel,
      };
      let res = await this.http(
        this.api.categories +
          "/" +
          this.value[2] +
          "/attributes/" +
          row.attr_id,
        data,
        "put"
      );
      console.log(res.data.data);
      this.tableData[index].attr_vals = res.data.data.attr_vals;
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    async handleInputConfirm(row) {
      let index = this.tableData.findIndex((v) => v == row);
      let rowa = row.attr_vals.split(",");
      if (
        this.inputValue &&
        rowa.findIndex((v) => v == this.inputValue) == -1
      ) {
        rowa.push(this.inputValue);
        let data = {
          attr_vals: rowa.join(","),
          attr_name: row.attr_name,
          attr_sel: row.attr_sel,
        };
        let res = await this.http(
          this.api.categories +
            "/" +
            this.value[2] +
            "/attributes/" +
            row.attr_id,
          data,
          "put"
        );
        console.log(res.data.data);
        this.tableData[index].attr_vals = res.data.data.attr_vals;
        this.inputVisible = false;
        this.inputValue = "";
      }
    },
  },
};
</script>
})
</script>

<style scoped lang="scss">
::v-deep .el-table__expanded-cell {
  padding: 30px;
}
::v-deep .el-tag--light {
  margin: 10px 0;
}
::v-deep .el-table {
  margin-top: 20px;
}
::v-deep .el-card__body {
  padding: 0;
}
::v-deep .el-input__inner {
  margin: 15px 0;
}
::v-deep .el-tag--light {
    margin-right: 10px;
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
.el-tag + .el-tag {
  margin-right: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>