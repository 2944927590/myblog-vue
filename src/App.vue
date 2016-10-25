<template>
  <div id="app">
    <blog-nav></blog-nav>
    <blog-main></blog-main>
    <blog-footer></blog-footer>
  </div>
</template>

<script>
  import blogNav from './components/blog-nav.vue';
  import blogMain from './components/blog-main.vue';
  import blogFooter from './components/blog-footer.vue';

  export default {
    name: 'app',
    components: {
      'blogNav': blogNav,
      'blogMain': blogMain,
      'blogFooter': blogFooter
    },
    methods: {

    }
  }
</script>

<style>
  body {
    font-family: "Helvetica Neue",Helvetica,"Hiragino Sans GB","STHeitiSC-Light","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
  }
</style>
