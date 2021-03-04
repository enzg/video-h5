// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'jquery'
import globalVar from '@/api/global_var.js'
import './assets/css/style.css'
import md5 from 'js-md5';
import 'babel-polyfill'
import SlideVerify from 'vue-monoplasty-slide-verify';


Vue.config.productionTip = false
Vue.prototype.g = globalVar
Vue.prototype.$md5 = md5

Vue.use($)
Vue.use(SlideVerify);
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: {App},
    template: '<App/>'
})
