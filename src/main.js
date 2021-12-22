import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { ValidationProvider } from 'vee-validate/dist/vee-validate.full.esm';
import { ValidationObserver} from 'vee-validate'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons'



library.add(fas, faGoogle)
Vue.component('fa', FontAwesomeIcon)


Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

Vue.config.productionTip = false



new Vue({
  vuetify,
  render: h => h(App),
}).$mount('#app')
