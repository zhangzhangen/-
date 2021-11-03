<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card bottom">
      <el-upload
        action=""
        :on-change="getFile"
        :limit="1"
        list-type="picture"
        :auto-upload="false"
      >
        <el-button size="small" type="primary"
          >选择图片上传,最多上传一张图片</el-button
        >
      </el-upload>
    </el-card>
  </div>
</template>
<script>
import axios from "axios";
import qs from 'qs'   
export default {
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
    };
  },
  methods: {
    getFile( file, fileList) {
      console.log(file, fileList)
        this.getBase64(file.raw).then((res) => {
        axios.post('bai/rest/2.0/ocr/v1/idcard?access_token='+ this.token,
        qs.stringify({
          image:res,
          id_card_side:'front'
        }),{
          headers:{
            'Content-Type':'application/x-www-form-urlencoded'
          }
        }).then((res) => {console.log(res)})


      });
    },
     getBase64(file) {
    return new Promise(function (resolve, reject) {
      let reader = new FileReader();
      let imgResult = "";
      reader.readAsDataURL(file);
      reader.onload = function () {
        imgResult = reader.result;
      };
      reader.onerror = function (error) {
        reject(error);
      };
      reader.onloadend = function () {
        resolve(imgResult);
      };
    });
  },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
  },
  async created() {
    let data = {
      grant_type: "client_credentials",
      client_id: "gFFhnB2m2OsZxQocXobgO1VY",
      client_secret: "lm5cYxnFugh57etb4w1lcBaVDSiF08rn",
    };
    axios
      .post(
        "bai/oauth/2.0/token" +
          "?grant_type=" +
          data.grant_type +
          "&client_id=" +
          data.client_id +
          "&client_secret=" +
          data.client_secret +
          "&"
      ).then((response) => this.token=response.data.access_token)
  },
};
</script>
<style scoped lang="scss">
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