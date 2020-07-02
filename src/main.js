import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import axios from 'axios'
import VueRouter from 'vue-router'



import App from './App.vue'
import HelloWorld from './components/HelloWorld.vue'
import Scan from './components/Scan.vue'

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.prototype.$http = axios.create({
  baseURL: 'http://localhost:3000'
})

const router = new VueRouter({
  routes: [
    { path: '/', component: HelloWorld },
    { path: '/scan', component: Scan }
  ]
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
