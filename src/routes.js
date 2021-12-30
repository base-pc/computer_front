import Home from './components/HomePage/Home.vue';
import Register from './components/Auth/Register.vue';

import AdminMain from './components/Admin/AdminMain.vue';
import UserMain from './components/User/UserMain.vue';

export default [

  { path: '/home',         name: 'home',     component: Home },
  { path: '/register', name: 'register', component: Register },

  { path: '/admin', name:'admin',  component: AdminMain },
  { path: '/user',  name: 'user',  component: UserMain },

]
