import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App';

import blogContent from './components/blog-content'
import blogDetail from './components/blog-detail';

Vue.use(VueRouter);

const routes = [
  { path: '/',  redirect: 'blog'},
  {
    path: '/blog',
    component: App,
    children: [{
      path: 'category/:c_id',
      component: blogContent,
      name: 'blog/category',
    }, {
      path: 'detail/:d_id',
      component: blogDetail,
      name: 'blog/detail',
    }, {
      path: '',
      redirect: 'category/0'
    }]
  },
  { path: '*', redirect: '/blog' },
];

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: routes,
  linkActiveClass: 'active'
});

const app = new Vue({
  router
}).$mount('#app');
