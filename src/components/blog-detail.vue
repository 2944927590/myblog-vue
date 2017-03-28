<template>
  <div class="col-md-9" v-if="articles">
    <div class="col-md-12 article-title"> {{articles.current.title}} </div>
    <div class="col-md-12 article-icon">
      <ul>
        <li>
          <i class="glyphicon glyphicon-folder-open"></i>&nbsp;{{articles.current.category}}
        </li>
        <li>
          <i class="glyphicon glyphicon-time"></i>&nbsp;{{articles.current.create_time}}
        </li>
        <li>
          <i class="glyphicon glyphicon-eye-open"></i>&nbsp;{{articles.current.hits}}人阅读
        </li>
      </ul>
    </div>
    <div class="col-md-12">
      <p class="article-content" v-html="articles.current.content"></p>
    </div>
    <div class="col-md-12 article-icon">

    </div>
    <div class="col-md-12">
      <p class="article-pre" v-if="articles.pre"><router-link :to="{name: 'blog/detail', params: { c_id: this.$route.params.c_id, d_id: articles.pre.id }}" :title="articles.pre.title"><i class="glyphicon glyphicon-chevron-up"></i>&nbsp;上一篇：{{articles.pre.title}}</router-link></p>
      <p class="article-next" v-if="articles.next"><router-link :to="{name: 'blog/detail', params: { c_id: this.$route.params.c_id, d_id: articles.next.id }}" :title="articles.next.title"><i class="glyphicon glyphicon-chevron-down"></i>&nbsp;下一篇：{{articles.next.title}}</router-link></p>
    </div>
  </div>
</template>

<script>
  import bus from '../bus';

  import query from '../lib/core/data';
  import time from '../lib/core/time';
  import appConfig from './config/app-config';


  export default {

    name: 'blog-detail',

    data() {
      return {
        dId: this.$route.params.d_id,
        articles: null
      }
    },

    mounted() {
      this.$nextTick(function () {
        this.getDetailById();
      });
    },

    watch: {
      '$route' (to, from) {
        this.dId = Number( to.params.d_id );
        this.getDetailById();
      }
    },

    methods: {
      getDetailById() {
        const self = this;
        bus.$emit('triggerLoading');
        query.query( appConfig.api.home + 'blog/getDetailById', {
          categoryId: this.$route.params.c_id,
          detailId: this.dId
        }, function (r) {
          if (r.status === 1) {
            self.articles = r.data.lists;
            self.articles.current.create_time = time.format('yyyy/mm/dd', parseInt(self.articles.current.create_time) * 1000);

            self.articles.current.content = self.articles.current.content.replace(/(\<img src=[\'\"]?)([^\'\"]*)([\'\"]?)/igm, function($1, $2, $3, $4) {
              if( !/.gif/.test($3) ) {
                return $2 + appConfig.url +  $3 + $4;
              } else {
                return $1;
              }
            });

            bus.$emit('triggerLoading');
          }
        }, 0);
      }
    }
  }
</script>
<style>
  p.article-content img[title] {
    width: 96%;
  }
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .article-title {
    font-size: 16px;
  }
  .article-icon {
    border-bottom: 1px #e5e5e5 solid;
  }
  .article-icon ul {
    float: right;
    padding: 2px 0 4px;
    margin: 0;
  }
  .article-icon ul li {
    list-style: none;
    display: inline-block;
    margin-left: 20px;
  }
  .article-icon ul li a,
  .article-pre a,
  .article-next a {
    text-decoration: none;
    color: #333;
  }
  .article-icon ul li a:hover,
  .article-icon ul li a:active,
  .article-icon ul li a:visited,
  .article-pre a:hover,
  .article-next a:hover {
    text-decoration: none;
    color: red;
  }
  .article-icon ul li a.praise {
    color: red;
  }
  .article-icon ul li a.praise:hover {
    color: #333;
  }
  .article-icon ul:after {
    display: block;
    clear: both;
    content: "";
  }
  .article-content {
    padding: 10px 0 20px;
    min-height: 400px;
  }
  p.article-pre, p.article-next {
    padding: 4px 0;
    margin: 0;
  }
</style>

