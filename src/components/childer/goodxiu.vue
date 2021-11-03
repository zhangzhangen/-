<template>
  <div>
    <el-dialog title="修改用戶信息" :visible.sync="dia">
      <el-form :model="user">
        <el-form-item label="商品名称" :label-width="formLabelWidth">
          <el-input v-model="user.goods_name"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" :label-width="formLabelWidth">
          <el-input v-model="user.goods_price"></el-input>
        </el-form-item>
        <el-form-item label="库存" :label-width="formLabelWidth">
          <el-input v-model="user.goods_number"></el-input>
        </el-form-item>
        <el-form-item label="商品重量" :label-width="formLabelWidth">
          <el-input v-model="user.goods_weight"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="$parent.cancel">取 消</el-button>
        <el-button
          type="primary"
          @click="$parent.succer(user)"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["dia", "user"],
  data() {
    return {
      formLabelWidth: "120px",
    };
  },
};
</script>