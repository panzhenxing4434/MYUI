// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from './App'
import './assets/css/allCss.css'
import './assets/style.css'
import './assets/font-awesome-4.7.0/css/font-awesome.css'
//require(`src/assets/style.css`)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
