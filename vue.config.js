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
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:后端端口',
        changeOrigin: true
      }
    }
  }
  outputDir: 'D:/UGC-Content-Creator1/dist',
})
