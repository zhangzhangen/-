module.exports = {
    devServer: {
        proxy: { 
          '/bai': {
           target: "https://aip.baidubce.com/",
            changOrigin: true,  
            pathRewrite: {
              '/bai': ''
            }
          }
        }
      },
}