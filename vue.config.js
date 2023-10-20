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
});
