<template>
  <header class="page-head">
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
            <span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="javascript:;" >xzq's Blog</a>
        </div>
        <div class="collapse navbar-collapse">
          <ul class="nav navbar-nav" id="navbar-nav">
            <li class="active" >
              <a href="javascript:;" >首页 <span class="sr-only">(current)</span></a>
            </li>
            <li v-for="(list, index) in lists" v-if="list.children.length == 0">
              <a href="javascript:;">{{list.name}}</a>
            </li>
            <li class="dropdown" v-for="(list, index) in lists" v-if="list.children.length != 0">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                {{list.name}}
                <span class="caret"></span>
              </a>
              <ul class="dropdown-menu">
                <li><a href="javascript:;" v-for="(child, i) in list.children">{{child.name}}</a></li>
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

export default {

  name: 'blog-nav',

  data() {
    return {
      'lists': []
    }
  },

  created() {
    this.getNav();
  },

  methods: {
    getNav() {
      let self = this;
      query.query('/static/mock/nav.json', function (r) {
        if(r.errCode == 200) {
          self.doNav(r.data, function (res) {
            self.lists = res;
          });
        }
      }, 1000);
    },
    doNav(topicList, cb) {
      var arr = [];
      topicList.forEach(function(v) {
        var children = [];
        if(0 == v['pid']) {
          topicList.forEach(function(vv) {
            if (vv['pid'] == v['id']) {
              children.push(vv);
            }
          });
          v['children'] = children;
          arr.push(v);
        }
      });
      cb && cb(arr);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
</style>

