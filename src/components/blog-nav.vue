<template>
  <header class="page-head">
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <router-link class="navbar-brand" to="/blog" exact>xzq's Blog</router-link>
        </div>
        <div class="collapse navbar-collapse">
          <ul class="nav navbar-nav" id="navbar-nav" >
            <router-link tag="li" to="/blog/category/c_id/0/p/1" :class="{active: 0 == cId}">
              <a>首页</a>
            </router-link>
            <router-link
              tag="li"
              v-for="(list, index) in lists"
              v-if="list.children.length == 0"
              :to="{ name: 'blog/category', params: { c_id: list.id, p_num: 1 } }"
              :class="{active: list.id == cId}"
            >
              <a>{{list.name}}</a>
            </router-link>
            <li class="dropdown" v-for="(list, index) in lists" v-if="list.children.length != 0" :class="{active: list.id == pid}">
              <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                {{list.name}}
                <span class="caret"></span>
              </a>
              <ul class="dropdown-menu">
                <li >
                  <router-link
                    v-for="(child, i) in list.children"
                    :to="{ name: 'blog/category', params: { c_id: child.id, p_num: 1 } }"
                    :class="{active: child.id == cId}"
                  >{{child.name}}</router-link>
                </li>
              </ul>
            </li>
          </ul>
          <form class="navbar-form navbar-right" role="search">
            <div class="form-group">
              <input type="text" v-model.trim="searchText" class="form-control search-input" placeholder="Search Title">
            </div> 
            <button type="button" class="btn btn-default search-button" @click="searchTitle">搜索</button>
          </form>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>

import query from '../lib/core/data';
import config from './config/app-config';
import bus from '../bus';

export default {

  name: 'blog-nav',

  data() {
    return {
      lists: [],
      cId: this.$route.params.c_id,
      searchText: ''
    }
  },

  mounted() {
    this.$nextTick(function () {
      this.getNav();
    });
  },

  watch: {
    '$route' (to, from) {
      this.cId = Number( to.params.c_id );
    }
  },
  computed: {
    pid() {
      const hasChild = this.lists.filter( (value) => {
          return value.children.length > 0 ;
      });
      for ( let i = 0; i < hasChild.length; i ++ ) {
        for ( let j = 0; j < hasChild[i].children.length; j ++ ) {
          if ( hasChild[i].children[j].id  == this.cId ) {
            return hasChild[i].children[j].pid;
          }
        }
      }
    }
  },
  methods: {

    getNav () {
      let self = this;
      self.$emit('loading');
      query.query( config.api.home + 'nav/getNav', function (res) {
        if (res.status === 1) {
          self.lists = res.data;
          self.$emit('loading');
        }
      }, 1000);
    },

    searchTitle() {
      if(!this.searchText) return;
      this.$router.push({
        name: 'blog/search',
        params: {
          s_text: this.searchText,
          p_num: 1
        }
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .page-head .navbar {
    border-radius: 0;
  }
  .navbar-nav>li:hover {
    background-color: #eee;
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

