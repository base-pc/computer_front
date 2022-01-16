import Home from './components/HomePage/Home.vue';

import AdminMain from './components/Admin/AdminMain.vue';
import UserMain from './components/User/UserMain.vue';
import CategoryProducts from './components/HomePage/CategoryProducts.vue';
import {globalStore} from './main'

export default [

  { path: '/',   redirect:'/home',    },

  {
    path: '/home',
    name:'home',
    component: Home,

    beforeEnter: (to, from, next) => {

      if(globalStore.logged_in && !globalStore.is_admin) {
        return next({
          name: 'user'
        })
      }else if(globalStore.logged_in && globalStore.is_admin)
      {
        return next({
          name:'admin'
        })
      }
      next();
    }

  },

  {
    path: '/admin',
    name: 'admin',
    component: AdminMain,

    beforeEnter: (to, from, next) => {

      if(!globalStore.logged_in || !globalStore.is_admin) {
        return next({
          name: 'home'
        })
      }
      next();
    }

  },

  {
    path: '/user',
    name: 'user',
    component: UserMain,

    beforeEnter: (to, from, next) => {

      if(!globalStore.logged_in || globalStore.is_admin) {
        return next({
          name: 'home'
        })
      }
      next();
    }
  },

  { path: '/products',  name: 'products',  component: CategoryProducts },

]
