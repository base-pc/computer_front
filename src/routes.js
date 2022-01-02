import Home from './components/HomePage/Home.vue';

import AdminMain from './components/Admin/AdminMain.vue';
import UserMain from './components/User/UserMain.vue';
import CategoryProducts from './components/HomePage/CategoryProducts.vue';


export default [

  { path: '/',         name: 'Home',     component: Home },

  { path: '/admin', name: 'admin', component: AdminMain },
  { path: '/user',  name: 'user',  component: UserMain },
  { path: '/products',  name: 'products',  component: CategoryProducts },

]
