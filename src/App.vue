<template>
  <div class="app">
    <blog-nav :class="{loading: isLoading}" v-on:loading="triggerLoading"></blog-nav>
    <blog-main :class="{loading: isLoading}"></blog-main>
    <blog-footer :class="{loading: isLoading}"></blog-footer>
    <blog-loading v-show="isLoading"></blog-loading>
  </div>
</template>

<script>
  import bus from './bus'; //空的 Vue 实例作为中央事件总线

  import blogNav from './components/blog-nav';
  import blogMain from './components/blog-main';
  import blogFooter from './components/blog-footer';
  import blogLoading from './components/blog-loading.vue';

  export default {
    name: 'app',
    components: {
      'blogNav': blogNav,
      'blogMain': blogMain,
      'blogFooter': blogFooter,
      'blogLoading': blogLoading
    },
    created() {
      this.bindEvent();
    },
    data() {
      return {
        isLoading: false
      }
    },
    methods: {

      triggerLoading() {
        this.isLoading = !this.isLoading;
      },

      bindEvent () {
        bus.$on('triggerLoading', () => {
          this.isLoading = !this.isLoading;
          if ( !this.isLoading ) {
            this.scrollToTop();
          }
        });
      },

      scrollToTop() {
        $('html, body').animate({
          scrollTop: 0
        }, 300);
      }

    }
  }
</script>

<style>
  body {
    font-family: "Helvetica Neue", Helvetica, "Hiragino Sans GB", "STHeitiSC-Light", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
  }
  .app .loading {
    -webkit-filter: blur(3px);
    -moz-filter: blur(3px);
    -ms-filter: blur(3px);
    filter: blur(3px);
  }
</style>
