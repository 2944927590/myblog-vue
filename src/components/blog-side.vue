<template>
  <div class="col-md-3">
    <p class="notice">
      <i class="glyphicon glyphicon-bullhorn"></i>&nbsp;<span>公告</span>
    </p>
    <div class="notice-content">本博客文章如无特别注明，均为原创，欢迎转载、传阅，共同交流~</div>
    <p class="blogger">
      <i class="glyphicon glyphicon-user"></i>&nbsp;<span>博主</span>
    </p>
    <div class="blogger-info">
      <p><span>昵称：<a href="javascript:;">阿林十一</a></span></p>
      <p><span>家乡：<a href="javascript:;">江西省-赣州市</a></span></p>
      <p><span>现居住地：<a href="javascript:;">江西省-赣州市</a></span></p>
      <p><span>园龄：<a href="javascript:;">8个月</a></span></p>
    </div>
    <p class="new-blog"><i class="glyphicon glyphicon-list-alt"></i>&nbsp;<span>最新文章</span></p>
    <div class="new-blog-details">
      <ul>
        <li><a href="javascript:;" title="你你你你你好哎你" >1.你你你你你好哎你</a></li>
        <li><a href="javascript:;" title="图片背影" >2.图片背影</a></li>
        <li><a href="javascript:;" title="fff" >3.fff</a></li>
        <li><a href="javascript:;" title="怎么才能创建博客并有收益" >4.怎么才能创建博客并有收益</a></li>
        <li><a href="javascript:;" title="猫咪猫咪嘿嘿嘿" >5.猫咪猫咪嘿嘿嘿</a></li>
      </ul>
    </div>
    <p class="reading-list"><i class="glyphicon glyphicon-list"></i>&nbsp;<span>阅读排行榜</span></p>
    <div class="reading-list-details">
      <ul>
        <li><a href="javascript:;" title="图片背影" >1.图片背影</a></li>
        <li><a href="javascript:;" title="匆匆那些年" >2.匆匆那些年</a></li>
        <li><a href="javascript:;" title="猫咪猫咪嘿嘿嘿" >3.猫咪猫咪嘿嘿嘿</a></li>
        <li><a href="javascript:;" title="你你你你你好哎你" >4.你你你你你好哎你</a></li>
        <li><a href="javascript:;" title="怎么才能创建博客并有收益" >5.怎么才能创建博客并有收益</a></li>
      </ul>
    </div>
  </div>
</template>

<script>

  export default {

    name: 'blog-side',

    data() {
      return {

      }
    },

    created() {

    },

    methods: {

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

