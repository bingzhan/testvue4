const path = require('path');
const DllPlugin = require('webpack/lib/DllPlugin');

module.exports = {
  entry: {
    vue: ['vue', 'vue-router', 'vuex'],
    axios: ['axios', 'crypto-js'],
  },
  output: {
    filename: '[name].dll.js',
    path: path.resolve(__dirname, 'public'),
    library: '_dll_[name]',
  },
  plugins: [
    new DllPlugin({
      name: '_dll_[name]',
      path: path.join(__dirname, 'public', '[name].manifest.json'),
    })
  ],
}
