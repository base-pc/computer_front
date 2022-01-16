import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'

import VueRouter from 'vue-router'
import Routes from './routes'
import VueCookie from 'vue-cookie'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons'

library.add(fas, faGoogle)

Vue.component('fa', FontAwesomeIcon)

Vue.component('vuetify', vuetify);

Vue.config.productionTip = false

window.Event = new Vue();

Vue.use(VueRouter);
Vue.use(VueCookie);

const router = new VueRouter({

  routes: Routes

});

export const globalStore = new Vue({
  data: {
    user_avatar : '',
    is_admin    : false,
    logged_in   : false,
  }
});

new Vue({
  vuetify,
  render: h => h(App),
  router: router,
}).$mount('#app')
