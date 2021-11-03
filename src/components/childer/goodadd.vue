<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/goods' }">商品列表</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card bottom">
      <el-alert
        title="消息提示的文案"
        type="info"
        center
        :closable="false"
        show-icon
      ></el-alert>
      <el-steps :active="active">
        <el-step title="基本信息" icon="el-icon-edit"></el-step>
        <el-step title="商品参数" icon="el-icon-document"></el-step>
        <el-step el-step title="商品内容" icon="el-icon-collection"></el-step>
        <el-step title="商品图片" icon="el-icon-picture"></el-step>
        <el-step title="商品属性" icon="el-icon-notebook-2"></el-step>
        <el-step el-step title="完成" icon="el-icon-circle-check"></el-step>
      </el-steps>

      <div class="content">
        <div>
          <el-tabs tab-position="left" :before-leave="beforeleave">
            <el-tab-pane label="基本信息">
              <div>
                <div style="margin: 20px"></div>
                <el-form
                  label-position="top"
                  label-width="80px"
                  :model="formLabelAlign"
                >
                  <el-form-item label="商品名称">
                    <el-input v-model="formLabelAlign.goods_name"></el-input>
                  </el-form-item>
                  <el-form-item label="商品价格">
                    <el-input v-model="formLabelAlign.goods_price"></el-input>
                  </el-form-item>
                  <el-form-item label="商品重量">
                    <el-input v-model="formLabelAlign.goods_weight"></el-input>
                  </el-form-item>
                  <el-form-item label="商品数量">
                    <el-input v-model="formLabelAlign.goods_number"></el-input>
                  </el-form-item>
                  <el-form-item label="商品分类">
                    <el-cascader
                      :props="cateProps"
                      :options="options"
                      v-model="formLabelAlign.good_cat"
                      clearable
                    ></el-cascader>
                  </el-form-item>
                </el-form>
              </div>
            </el-tab-pane>
            <el-tab-pane label="商品参数">
              <div>{{ attr_name }}</div>
              <el-checkbox
                v-model="checked"
                :label="item"
                border
                v-for="item in checked"
                :key="item"
              ></el-checkbox>
            </el-tab-pane>
            <el-tab-pane label="商品属性">
              <el-form
                label-position="top"
                label-width="80px"
                :model="formLabelAlign"
              >
                <el-form-item :label="item.attr_name" v-for='(item,index) in commodity' :key='index'>
                  <el-input v-model="item.attr_vals"></el-input>
                </el-form-item>
                
                  
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="商品图片">
              <upimg :success='success'></upimg>
            </el-tab-pane>
            <el-tab-pane label="商品内容">
              <quill-editor @change="onEditorChange($event)" v-model="value"></quill-editor>
              <el-button type="primary">提交商品</el-button>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </el-card>
  </div>
</template>
<style scoped lang="scss">
::v-deep .el-checkbox {
  margin-top:20px;
}
::v-deep .el-steps{
  margin-top:20px;
}
::v-deep .el-button {
  margin-top: 20px;
}
::v-deep .el-tab-pane {
  min-height: 300px;
}
::v-deep .ql-toolbar.ql-snow + .ql-container.ql-snow {
  padding: 15px;
}
.bottom {
  width: 100%;
  box-sizing: border-box;
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

.ql-editor {
  min-height: 280px;
}
</style>
<script>
let upimg = () => import("../../components/childer/upimg.vue");
export default {
  async created() {
    let res = await this.http(this.api.categories);
    console.log(res.data.data);
    this.options = res.data.data;
  },
  components: { upimg },
  data() {
    return {
      url:'',
      value:'',
      commodity:[],
      active: 0,
      checked: [],
      attr_name: "",
      cateProps: {
        value: "cat_id",
        label: "cat_name",
        children: "children",
      },
      options: [],
      formLabelAlign: {
        goods_number: "",
        goods_weight: "",
        goods_price: "",
        goods_name: "",
        good_cat: "",
      },
      formInline: {
        user: "",
        region: "",
      },
    };
  },
  methods: {
    onEditorChange(value){
      console.log(this.value)
    },
    success(url){
      this.url = url 
      console.log(url)
    },
    async bulrbox() {
      let res = await this.http(this.api.categories + "/" +this.formLabelAlign.good_cat[2] + "/attributes?sel=many");
      this.attr_name = res.data.data[0].attr_name;
      console.log(res.data.data[0].attr_vals.split(","));
      this.checked = res.data.data[0].attr_vals.split(",");
    },
 async commod(){
      let res = await this.http(this.api.categories + "/" +this.formLabelAlign.good_cat[2] + "/attributes?sel=only");
      console.log(res.data.data)
      this.commodity = res.data.data
    },
    async beforeleave(ctiveName, oldActiveName) {
      if (ctiveName == 2) {
        this.commod();
      }
      if (ctiveName == 1) {
        this.bulrbox();
      }
      ctiveName ? (this.active = Number(ctiveName)) : "";
    },
  },
};
</script>