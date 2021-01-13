module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/reshape/'
    : '/',
  devServer: {
    proxy: 'http://localhost:8080'
  }
}
