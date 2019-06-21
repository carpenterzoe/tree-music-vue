import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'

//TODO: 下面两个引用的具体用法，作用
import 'babel-polyfill'
import 'common/stylus/index.styl'

import VueLazyLoad from 'vue-lazyload'
import store from './store'

//TODO: 看这个插件
import Cube from 'cube-ui'
Vue.use(Cube)

Vue.config.productionTip = false

fastclick.attach(document.body)
Vue.use(VueLazyLoad, {
  loading: require('common/image/logo@2x.png')
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
