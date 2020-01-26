import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import { library, config } from "@fortawesome/fontawesome-svg-core"
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import routes from './routes'

config.autoAddCss = false;
library.add( fas );

Vue.component( 'vue-fontawesome', FontAwesomeIcon );
Vue.use( VueRouter )
Vue.use( Buefy, {
  defaultIconComponent: 'vue-fontawesome',
  defaultIconPack: 'fas'
})

Vue.config.productionTip = false

const router = new VueRouter({
  routes,
  base: process.env.BASE_URL,
  mode: 'history'
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
