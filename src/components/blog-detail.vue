<template>
  <div class="col-md-9">
    <div class="col-md-12 article-title">标题</div>
    <div class="col-md-12 article-icon">
      <ul>
        <li>
          <i class="glyphicon glyphicon-folder-open"></i>&nbsp;分类
        </li>
        <li>
          <i class="glyphicon glyphicon-time"></i>&nbsp;2017/2/3
        </li>
        <li>
          <i class="glyphicon glyphicon-eye-open"></i>&nbsp;20人阅读
        </li>
      </ul>
    </div>
    <div class="col-md-12">
      <p class="article-content">文章内容</p>
    </div>
    <div class="col-md-12 article-icon">
      <ul>
        <li>
          <a href="javascript:;" data-is-praise="0" data-detail-id="" data-trigger="clickPraise"><i class="glyphicon glyphicon-thumbs-up"></i>&nbsp;赞</a>
        </li>
        <li>
          <i class="glyphicon glyphicon-comment"></i>&nbsp;0人评论
        </li>
      </ul>
    </div>
    <div class="col-md-12">
      <p class="article-pre"><i class="glyphicon glyphicon-chevron-up"></i>&nbsp;上一篇：无</p>
      <p class="article-next"><i class="glyphicon glyphicon-chevron-down"></i>&nbsp;下一篇：无</p>
    </div>
  </div>
</template>

<script>
  import query from '../lib/core/data';
  import time from '../lib/core/time';
  import appConfig from './config/app-config';


  export default {

    name: 'blog-detail',

    data() {
      return {
        articles: []
      }
    },

    created() {

    },

    methods: {}
  }
</script>

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
  .article-icon ul li a ,
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
    text-indent: 2em;
  }
  p.article-pre, p.article-next {
    padding: 4px 0;
    margin: 0;
  }
</style>

