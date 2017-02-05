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
      path: 'category/:id',
      component: blogContent
    }, {
      path: 'detail/:id',
      component: blogDetail
    }, {
      path: '',
      redirect: 'category/1'
    }]
  },
  { path: '*', redirect: '/blog' },
];

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: routes
});

const app = new Vue({
  router
}).$mount('#app');
