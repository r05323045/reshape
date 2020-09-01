module.exports = {
  publicPath: '/reshape/dist',
  devServer: {
    proxy: 'http://localhost:8081'
  }
}
