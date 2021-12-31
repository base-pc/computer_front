import Home from './components/HomePage/Home.vue';

import AdminMain from './components/Admin/AdminMain.vue';
import UserMain from './components/User/UserMain.vue';


export default [

  { path: '/',         name: 'home',     component: Home },

  { path: '/admin', name: 'admin', component: AdminMain },
  { path: '/user',  name: 'user',  component: UserMain },

]
