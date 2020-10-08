import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import router from './router'
import { store } from './store/index'

Vue.config.productionTip = false


Vue.prototype.isMobile = () => {
  return screen.width <= 1100;
}

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
