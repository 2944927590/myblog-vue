<template>
  <div class="col-md-3">
    <p class="notice">
      <i class="glyphicon glyphicon-bullhorn"></i>&nbsp;<span>公告</span>
    </p>
    <div class="notice-content">{{broadcast}}</div>
    <p class="blogger">
      <i class="glyphicon glyphicon-user"></i>&nbsp;<span>博主</span>
    </p>
    <div class="blogger-info">
      <p><span>昵称 ：<a href="javascript:;">{{userInfo.name}}</a></span></p>
      <p><span>家乡 ：<a href="javascript:;">{{userInfo.hometown}}</a></span></p>
      <p><span>性别 ：{{userInfo.sex}}</span></p>
      <p><span>gitHub：<a href="javascript:;">{{userInfo.github}}</a></span></p>
      <p><span>email：<a href="javascript:;">{{userInfo.email}}</a></span></p>
    </div>
    <p class="new-blog"><i class="glyphicon glyphicon-list-alt"></i>&nbsp;<span>最新文章</span></p>
    <div class="new-blog-details">
      <ul>
        <router-link tag="li" v-for="(article, index) in newArticle" :to="{name: 'blog/detail', params: { c_id: article.category_id, d_id: article.id }}" >
          <a href="javascript:;" >{{index + 1}}.{{article.title}}</a>
        </router-link>
      </ul>
    </div>
    <p class="reading-list"><i class="glyphicon glyphicon-list"></i>&nbsp;<span>阅读排行榜</span></p>
    <div class="reading-list-details">
      <ul>
        <router-link tag="li" v-for="(article, index) in hitsArticle" :to="{name: 'blog/detail', params: { c_id: article.category_id, d_id: article.id }}" >
          <a href="javascript:;" >{{index + 1}}.{{article.title}}</a>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>

  import query from '../lib/core/data';
  import appConfig from './config/app-config';

  export default {

    name: 'blog-side',

    data() {
      return {
        broadcast: '',
        userInfo: {},
        newArticle: [],
        hitsArticle: []
      }
    },

    created() {
      this.getBroadcast();
      this.getUserInfo();
      this.getNewArticle();
      this.getHitsArticle();
    },

    methods: {
      getBroadcast() {
        const self = this;
        query.query( appConfig.api.home + 'blog/getBroadcast', function (r) {
          console.log(r);
          if (r.status === 1) {
            self.broadcast = r.data.broadcast.content;
          }
        }, 0);
      },
      getUserInfo() {
        const self = this;
        query.query( appConfig.api.home + 'blog/getUserInfo', function (r) {
          console.log(r);
          if (r.status === 1) {
            self.userInfo = r.data.userInfo;
          }
        }, 0);
      },
      getNewArticle() {
        const self = this;
        query.query( appConfig.api.home + 'blog/getNewArticle', function (r) {
          console.log(r);
          if (r.status === 1) {
            self.newArticle = r.data.newArticle;
          }
        }, 0);
      },
      getHitsArticle() {
        const self = this;
        query.query( appConfig.api.home + 'blog/getHitsArticle', function (r) {
          console.log(r);
          if (r.status === 1) {
            self.hitsArticle = r.data.hitsArticle;
          }
        }, 0);
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  p.notice, p.blogger, p.new-blog, p.reading-list {
    padding: 20px 0 6px;
    margin: 0;
    border-bottom: 1px #e5e5e5 solid;
    font-size: 16px;
  }
  p.notice i p.new-blog i {
    font-size: 20px;
    vertical-align: text-bottom;
  }
  .notice-content {
    text-indent: 2em;
  }
  p.blogger i {
    font-size: 16px;
    vertical-align: text-bottom;
  }
  .blogger-info, .new-blog-details, .notice-content, .reading-list-details {
    padding: 10px 0;
  }
  .blogger-info a {
    color: #333;
    text-decoration: none;
  }
  .blogger-info > p >span >a:hover {
    color: red;
  }
  .new-blog-details ul, .reading-list-details ul {
    padding: 0;
    margin: 0;
  }
  .new-blog-details ul li, .reading-list-details ul li {
    padding: 4px 0;
    list-style: none;
  }
  .new-blog-details ul li:first-child,
  .reading-list-details ul li:first-child {
    padding-top: 0;
  }
  .new-blog-details ul li:last-child,
  .reading-list-details ul li:last-child {
    padding-bottom: 0;
  }
  .new-blog-details ul li a, .reading-list-details ul li a {
    color: #333;
    text-decoration: none;
  }
  .new-blog-details ul li a:hover,
  .reading-list-details ul li a:hover {
    color: red;
  }
</style>

