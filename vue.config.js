module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    proxy: {
      '/api': {
        target: 'https://icnav.online',
        ws: true,
        changeOrigin: true
      }
    }
  }
}

