import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import zh from './zh_TW.js'
import Loading from 'vue-loading-overlay'
import VueClipboard from 'vue-clipboard2'
import Chartkick from 'vue-chartkick'
import Chart from 'chart.js'
import 'jquery'
import 'bootstrap'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import { ValidationObserver, ValidationProvider, localize, configure, extend } from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'
import 'vue-loading-overlay/dist/vue-loading.css'
import App from './App.vue'
import router from './router'
import './bus'

Vue.use(Chartkick.use(Chart))
Vue.use(VueClipboard)
Vue.use(VueAxios, axios)
Vue.config.productionTip = false

Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule])
})

configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid'
  }
})
localize('tw', zh)

Vue.component('Loading', Loading)
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

Vue.use(Loading, {
  loader: 'spinner',
  opacity: 0.8,
  isFullPage: false
})

Vue.filter('priceFormat', function (value) {
  return 'NT$ ' + value
    .toString().replace(/^(-?\d+?)((?:\d{3})+)(?=\.\d+$|$)/,
      function (all, pre, groupOf3Digital) {
        return pre + groupOf3Digital.replace(/\d{3}/g, ',$&')
      })
})

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')
