
import axios from 'axios'


axios.interceptors.request.use(
    config => {
    // 判断是否存在token，若是存在的话，则每一个http header都加上token
      let token = sessionStorage.getItem('token')
      if (!config.headers.hasOwnProperty('Authorization') && token) {
        config.headers.Authorization = token;
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    });
  function http(url,data,method,params){
    return new Promise((resolve, reject) => {
        axios({
            method,
            url,
            data,
            params
        }).then(res=>{
            return resolve(res)
        }).catch(err=>{
            return reject(err)
        })
    })
}


export default http