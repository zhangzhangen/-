<template>
  <div class="background">
    <div class="loginbox">
        <div class="loginposition">
          <img src="http://localhost:8080/img/logo.0c9e7b49.svg" alt="">
        </div>
        <div>
          <div class="logininput">
          <el-input v-model="inpu1" placeholder="请输入内容" prefix-icon='el-icon-s-custom' >
</el-input></div><div class="logininput">
          <el-input v-model="inpu2" show-password placeholder="请输入内容" prefix-icon='el-icon-lock'></el-input>
          </div>
          <div class="loginbottom">
            <popup type="success" :inpu1 = "inpu1" :inpu2 = "inpu2" >登录</popup>
            <el-button type="info" @click="reset">重置</el-button>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import popup from './../components/pop-up.vue'
export default {
  data(){
    return {
      inpu1:'admin',
      inpu2:'123456',
    }
  },
  components:{
    popup
  },
  methods:{
    reset(){
      this.inpu1='admin'
      this.inpu2='123456'
    }
  }
};
</script>
<style scoped lang="scss">
.logininput{
  margin-bottom: 22px;
  width: 410px;
}
.background {
  width: 100vw;
  height: 100vh;
  background: #2b4b6b;
  display: flex;
  justify-content: center;
  align-items: center;
}
.loginbox{

  position: relative;
  padding: 120px 20px 20px 20px;
  background: white;
}
.loginposition{
  top: -70px;
  left: 152px;
  width: 142px;
  height:142px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  border-radius: 50%;
  background-color:white;
  img{
    width: 130px;
    height: 130px;
    border-radius: 50%;
  }
}
.loginbottom{
    display: flex;
    justify-content: end;
  }
</style>
