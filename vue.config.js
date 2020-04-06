const path = require('path');
const DllReferencePlugin = require('webpack/lib/DllReferencePlugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

console.log(888, process.env.NODE_ENV);
module.exports = {
  // output: {
  //   filename: '[name].js',
  //   path: path.resolve(__dirname, 'dist'),
  // },
  // cors 相关 https://jakearchibald.com/2017/es-modules-in-browsers/#always-cors
  // corsUseCredentials: false,
  // webpack 配置，键值对象时会合并配置，为方法时会改写配置
  // https://cli.vuejs.org/guide/webpack.html#simple-configuration
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'beta') {
      config.plugins.push(
        new DllReferencePlugin({
          manifest: require('./public/vue.manifest.json'),
        }),
        new DllReferencePlugin({
          manifest: require('./public/axios.manifest.json'),
        }),
        new AddAssetHtmlPlugin({
          filepath: require.resolve(path.resolve(__dirname, './public/vue.dll.js')),
          publicPath: '/js',
          outputPath: '/js',
        }),
        new AddAssetHtmlPlugin({
          filepath: require.resolve(path.resolve(__dirname, './public/axios.dll.js')),
          publicPath: '/js',
          outputPath: '/js',
        }),
      );
    }
  }
};
