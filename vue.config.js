const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          options: {
            appendTsSuffixTo: [/\.vue$/],
          },
          exclude: /node_modules/,
        },
      ],
    },
  },
<<<<<<< HEAD
  // devServer: {
  //   proxy: {
  //     '/api': {
  //       target: 'http://localhost:后端端口',
  //       changeOrigin: true
  //     }
  //   }
  // }
=======
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:后端端口',
        changeOrigin: true
      }
    }
  }
  outputDir: 'D:/UGC-Content-Creator1/dist',
>>>>>>> ea5901c4ea0a1eb88b818b36ecf6b41f139893b3
})
