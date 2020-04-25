const path = require('path');
const DllReferencePlugin = require('webpack/lib/DllReferencePlugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

console.log(888, process.env.NODE_ENV, process.env.VUE_APP_MOCK);
module.exports = {
  devServer: {
    before: function(app, server, compiler) {
      if (!process.env.VUE_APP_MOCK) return false;
      const bodyParser = require('body-parser');
      const fs = require('fs');
      const handle = (url, methods, query, res) => {
        const existsJson = fs.existsSync(`./mock${url}.json`);
        if (existsJson) {
          const data = require(`./mock${url}.json`);
          res.json(data);
          return false
        }
        const existsJs = fs.existsSync(`./mock${url}.${methods}.js`);
        if (existsJs) {
          const text = fs.readFileSync(`./mock${url}.${methods}.js`, 'utf8');
          const data = eval('(function(req){'+text+'})('+query+')');
          res.json(data);
          return false
        }
        res.json({ custom: '找不到对应的 mock 文件！' });
      }

      app.get('/*', function(req, res, next) {
        const isStatic = /\./.test(req.url);
        // console.log(232311, req.url, req.headers['accept']);
        if (req.headers['sec-fetch-dest'] === 'document' || isStatic) {
          next();
          return false;
        }
        console.log(2323, req.url, req.query);
        setTimeout(() => {
          handle(req.url.split('?')[0], 'get', JSON.stringify(req.query), res);
        }, 2000)
      });
      app.use(bodyParser.json());
      app.post('/*', bodyParser.json(), function(req, res, next) {
        console.log(2323, req.url, req.body);
        handle(req.url, 'post', JSON.stringify(req.body), res);
      });
    }
  },
  // cors 相关 https://jakearchibald.com/2017/es-modules-in-browsers/#always-cors
  // corsUseCredentials: false,
  // webpack 配置，键值对象时会合并配置，为方法时会改写配置
  // https://cli.vuejs.org/guide/webpack.html#simple-configuration
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
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
