import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';
import { library, config } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import routes from './routes';
import axiosApi from 'axios';
import * as VueGoogleMaps from 'vue2-google-maps';
import configPosition from './ConfigPosition'

Vue.component('gmap-cluster', VueGoogleMaps.Cluster);
Vue.prototype.$position = configPosition 

configPosition.existDataLocalSotare();


const axios = axiosApi.create({
  baseURL: `http://smpcourier.com/WS_SMPCOURIER/` 
});

Vue.prototype.$axios = axios

config.autoAddCss = false;
library.add( fas );

Vue.component( 'vue-fontawesome', FontAwesomeIcon );
Vue.use( VueRouter )
Vue.use( Buefy, {
  defaultIconComponent: 'vue-fontawesome',
  defaultIconPack: 'fas'
})
Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyBXFV918UUvZhRCiJ2EXe5pZ0Ys_-IolKM",
    libraries: "places" // necessary for places input
  }
});

Vue.config.productionTip = false


 
const router = new VueRouter({
  routes,
  base: process.env.BASE_URL
})


router.beforeEach((to, from, next) => {
  if( window.localStorage.getItem('login') || to.name == 'home'){
    next()
  } else {
    next({
      path: '/'
    })
  }
 
})


// router.beforeResolve((to, from, next) => {
//   // If this isn't an initial page load.
      
//       // Start the route progress bar.
     
//        next()
// })
new Vue({
  render: h => h(App),
  router 
}).$mount('#app')
