import Vue from 'vue'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
import store from './store'
import api from '@/api'

Vue.config.productionTip = false
Vue.use(ElementUI);

Vue.prototype.$http = axios;
Vue.prototype.$dispatch = function(type, query) {
  console.log(2323, this);
  api[type].call(this, query, this.$dispatch);
};

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
