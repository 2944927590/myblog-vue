<template>
  <header class="page-head">
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <router-link class="navbar-brand" to="/blog" exact>xzq's Blog</router-link>
        </div>
        <div class="collapse navbar-collapse">
          <ul class="nav navbar-nav" id="navbar-nav" v-on:click="addOutsideActive($event)">
            <router-link tag="li" to="/blog/category/0">
              <a>首页</a>
            </router-link>
            <router-link
              tag="li"
              v-for="(list, index) in lists"
              v-if="list.children.length == 0"
              :to="{ name: 'blog/category', params: { c_id: list.id } }">
              <a>{{list.name}}</a>
            </router-link>
            <li class="dropdown" v-for="(list, index) in lists" v-if="list.children.length != 0">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                {{list.name}}
                <span class="caret"></span>
              </a>
              <ul class="dropdown-menu">
                <li >
                  <router-link
                    v-for="(child, i) in list.children"
                    :to="{ name: 'blog/category', params: { c_id: child.id } }"

                  >{{child.name}}</router-link>
                </li>
              </ul>
            </li>
          </ul>
          <form class="navbar-form navbar-right" role="search">
            <div class="form-group">
              <input type="text" class="form-control search-input" placeholder="Search">
            </div> <button type="submit" class="btn btn-default search-button">搜索</button>
          </form>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>

import query from '../lib/core/data';
import config from './config/app-config';

export default {

  name: 'blog-nav',

  data() {
    return {
      lists: []
    }
  },

  created() {
    this.getNav();
  },

  methods: {
    getNav () {
      let self = this;
      query.query( config.api.home + 'nav/getNav', function (res) {
        if (res.status === 1) {
          self.lists = res.data;
        }
      }, 1000);
    },
    addOutsideActive(e) {
      $(e.target).parent().siblings().removeClass('active');
      $(e.target).parents('li.dropdown').addClass('active');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .page-head .navbar {
    border-radius: 0;
  }
  .search-button {
    margin-left: -4px;
    border-radius: 0;
  }
  .search-input {
    border-radius: 0;
    border-right: none;
  }
  .dropdown-menu > .active > a,
  .dropdown-menu > .active > a:hover,
  .dropdown-menu > .active > a:focus {
    background-color: #8E8E8E;
  }
  .active {
    background-color: #E7E7E7;
  }
</style>

