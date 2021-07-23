const host = 'https://unidemo.dcloud.net.cn/';

// #ifndef VUE3
import Vue from 'vue'
import App from './App'
Vue.config.productionTip = false
Vue.prototype.$host = host;
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createApp } from 'vue'
import App from './App'
const app = createApp(App)
app.config.globalProperties.$host = host;
app.mount('#app')
// #endif
