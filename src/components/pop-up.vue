<template>
  <el-button type="success" @click="open1"> 登录 </el-button>
</template>

<script>
export default {
  props: ["inpu1", "inpu2"],
  methods: {
    async open1() {
      let data = { username: this.inpu1, password: this.inpu2 };
      let res = await this.http(this.api.login, data, "post");
      if (res.data.meta.msg == "登录成功") {
        sessionStorage.setItem("token", res.data.data.token);
        sessionStorage.setItem("user",JSON.stringify(res.data.data.token));
        this.$notify({
            message: res.data.meta.msg,
            type: "success",
          });
        this.$router.push('/about')
      } else {
           this.$notify({
            message: res.data.meta.msg,
            type: "warning",
          });
      }
    },
  },
};
</script>