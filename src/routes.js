import Home from './components/HomePage/Home.vue';
import Register from './components/Auth/Register.vue';

import AdminMain from './components/Admin/AdminMain.vue';
import UserMain from './components/User/UserMain.vue';

export default [

  { path: '/', component: Home },
  { path: '/register', component: Register },

  { path: '/admin', component: AdminMain },
  { path: '/user', component: UserMain },


]
