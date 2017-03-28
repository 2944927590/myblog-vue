import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App';

import blogSearch from './components/blog-search'
import blogContent from './components/blog-content'
import blogDetail from './components/blog-detail';

Vue.use(VueRouter);

const routes = [
  { path: '/',  redirect: 'blog'},
  {
    path: '/blog',
    component: App,
    children: [{
      path: 'category/c_id/:c_id(\\d+)/p/:p_num(\\d+)',
      component: blogContent,
      name: 'blog/category',
    }, {
      path: 'search/s_text/:s_text/p/:p_num(\\d+)',
      component: blogSearch,
      name: 'blog/search',
    }, {
      path: 'detail/c_id/:c_id(\\d+)/d_id/:d_id(\\d+)',
      component: blogDetail,
      name: 'blog/detail',
    }, {
      path: '',
      redirect: 'category/c_id/0/p/1'
    }]
  },
];

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: routes,
  linkActiveClass: ''
});

const app = new Vue({
  router
}).$mount('#app');
