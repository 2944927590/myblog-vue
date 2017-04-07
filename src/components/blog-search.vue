<template>
  <div class="col-md-9">
    <div id="container-left">
      <div class="headline">文章<span class="font-green">搜索</span></div>
      <div class="article-list" v-if="listsCount">
        <article v-for="(article, index) in articles">
          <div class="title">
            <router-link :to="{name: 'blog/detail', params: { c_id: article.category_id, d_id: article.id }}" ><i class="glyphicon glyphicon-triangle-right icon-title"></i>&nbsp;{{article.title}}</router-link>
          </div>
          <div class="row">
            <div class="col-md-3">
              <img class="img-thumbnail" :src="(filePath + article.savepath + article.savename)">
            </div>
            <div class="col-md-9">
              <div class="content" v-html="article.content"></div>
            </div>
          </div>
          <div class="row sub-title">
            <div class="col-md-3"><i class="glyphicon glyphicon-time"></i>&nbsp;{{article.create_time}}</div>
            <div class="col-md-2"><i class="glyphicon glyphicon-folder-open"></i>&nbsp;&nbsp;{{article.category}}</div>
            <div class="col-md-2"><i class="glyphicon glyphicon-eye-open"></i> {{article.hits}}</div>
            <div class="col-md-5"><router-link :to="{name: 'blog/detail', params: { c_id: article.category_id, d_id: article.id }}" class="btn btn-success btn-sm pull-right btn-read-all" >阅读全文 &gt;&gt;</router-link></div>
          </div>
        </article>

        <pager :totalNum="listsCount" :maxNum="maxNum" :currentNum="pNum" :stepCallback="pagerStep"/>

      </div>
      <p class="empty-tip" v-if="!listsCount">{{emptyArticleMsg}}</p>
    </div>
  </div>
</template>

<script>
  import Pager from './blog-pager.vue';

  import query from '../lib/core/data';
  import time from '../lib/core/time';
  import appConfig from './config/app-config';
  import bus from '../bus';

  export default {

    name: 'blog-content',

    components: {
      pager: Pager
    },

    data() {
      return {
        articles: [],
        emptyArticleMsg: appConfig.emptyArticleMsg,
        maxNum: Number( appConfig.pagerMaxNum ),
        listsCount: 0,
        pNum: Number( this.$route.params.p_num ),
        filePath: appConfig.staticPath.file
      }
    },

    mounted() {
      this.$nextTick(function () {
        this.getDetail();
      });
    },

    computed: {
      pagerStep() {
        return {
          all() {
            this.$router.push({
              name: 'blog/search',
              params: {
                s_text: this.$route.params.s_text,
                p_num: this.current
              }
            });
          }
        }
      }
    },

    watch: {
      '$route' (to, from) {
        this.getDetail();
        this.pNum = Number( to.params.p_num );
      }
    },

    methods: {
      getDetail() {
        const self = this;
        bus.$emit('showLoading');
        query.query( appConfig.api.home + 'blog/getArticleBySearchText', {
          searchTitle: self.$route.params.s_text,
          pageNum: this.$route.params.p_num,
          pageLimit: appConfig.indexShowNum
        }, function (r) {
          bus.$emit('hideLoading');
          if (r.status === 1) {
            self.listsCount = Number( r.data.listsCount );
            self.timeToStr(r.data.lists, function( articles ) {
              self.articles = articles;
            });
          }
        }, 0);
      },
      bindEvent() {
        const self = this;
        bus.$on('searchTextEvent', (data) => {
          if(data) {
            this.$router.push({
              name: 'blog/search',
              params: {
                s_text: data,
                p_num: this.$route.params.p_num
              }
            });
            bus.$emit('triggerLoading');
            self.getDetail();
          }
        });
      },
      timeToStr (details, cb) {
        if(!details || 0 == details.length) {
          cb([]);
        } else {
          details.forEach(function(item) {
            item.create_time = time.format('yyyy年mm月dd日', parseInt(item.create_time * 1000));
            item.content = item.content.replace(/<[^>]*>/igm, function() {
              return '';
            }).substring(0, appConfig.indexContentLength) + '...';
          });
          cb(details || []);
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .headline {
    font-size: 18px;
    padding: 10px 0;
    border-bottom: 1px #e5e5e5 solid;
  }
  .font-green {
    font-size: 20px;
  }
  article {
    padding: 10px 0;
    border-bottom: 1px #e5e5e5 solid;
  }
  article:last-child {
    border-bottom: none;
  }
  article .title {
    padding: 10px 0;
    font-size: 16px;
  }
  article .title a {
    text-decoration: none;
    color: #333;
  }
  article .title a:hover {
    color: red;
  }
  article .title a:hover i {
    color: red;
  }
  article .title .icon-title {
    font-size: 12px;
    color: #ADB5A6;
  }
  article img.img-thumbnail {
    width: 220px;
    height: 100px;
    padding: 0;
    border-radius: 0;
    overflow: hidden;
  }
  article .content p {
    height: 100px;
    overflow: hidden;
  }
  article .sub-title {
    padding: 10px 0;
    vertical-align: bottom;
  }
  article .sub-title .btn-read-all {
    border-radius: 0;
    background-color: #ADB5A6;
    border-color: #ADB5A6;
  }
  article .sub-title .btn-read-all:hover {
    background-color: #74796F;
    border-color: #74796F;
  }
  p.empty-tip {
    margin: 10px 0;
    color: #777;
  }
</style>

