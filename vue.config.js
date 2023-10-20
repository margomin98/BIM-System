const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      sass: {
        // additionalData: `@import "@/styles/_variables.scss";`, // Import your global SCSS variables here
      },
    },
  },
  devServer: {
    proxy: {
      '/': {
        target: 'http://192.168.0.177:7008/', // 更改为你的目标域名
        changeOrigin: true,
        ws: false, 
      },
    },
  },
});
