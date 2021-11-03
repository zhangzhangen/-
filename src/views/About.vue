<template>
  <div class="about">
    <div class="top">
      <div>
        <img src="http://localhost:8080/img/logo.0c9e7b49.svg" alt="" />
        <div>优乐购电商后台管理系统</div>
        <div>Version：1.3.0</div>
      </div>
    </div>
    <div class="bottom">
      <navigation :listmenu="listmenu"></navigation>
      <div class="right">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import navigation from "../components/navigation.vue";
export default {
  components: { navigation },
  data() {
    return { listmenu: [] };
  },
  async mounted() {
    let res = await this.http(this.api.menus);
    this.listmenu = res.data.data;
  },
};
</script>
<style scoped lang="scss">
.bottom{
  display: flex;
  .right{
    height:100vh;
    flex: 1;
    box-sizing: border-box;
    padding: 20px;
    background-color: #eaedf1;
  }
}
.user {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .user_left {
    color: white;
    font-size: 20px;
    margin-right: 20px;
  }
  .user_right {
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    div:nth-child(2) {
      margin: 0 10px;
      color: white;
    }
  }
}
.top {
  width: 100vw;
  box-sizing: border-box;
  height: 60px;
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  div:nth-child(2) {
    width: 280px;
  }
  div:nth-child(1) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 450px;
    img {
      width: 58px;
      height: 58px;
      border-radius: 50%;
    }
    div:nth-child(2) {
      color: white;
      font-size: 22px;
      font-weight: bold;
    }
    div:nth-child(3) {
      font-weight: normal;
      font-size: 16px;
      color: white;
    }
  }
}
</style>

