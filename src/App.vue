<template>
  <div class="app">
    <blog-nav :class="{loading: isLoading}" v-on:loading="triggerLoading"></blog-nav>
    <blog-main :class="{loading: isLoading}"></blog-main>
    <blog-footer :class="{loading: isLoading}"></blog-footer>
    <blog-loading v-show="isLoading"></blog-loading>
    <blog-back-top v-show="topHeight"></blog-back-top>
  </div>
</template>

<script>
  import bus from './bus'; //空的 Vue 实例作为中央事件总线

  import blogNav from './components/blog-nav';
  import blogMain from './components/blog-main';
  import blogFooter from './components/blog-footer';
  import blogLoading from './components/blog-loading.vue';
  import blogBackTop from './components/blog-backtop.vue';

  export default {
    name: 'app',
    components: {
      'blogNav': blogNav,
      'blogMain': blogMain,
      'blogFooter': blogFooter,
      'blogLoading': blogLoading,
      'blogBackTop': blogBackTop
    },
    created() {
      this.bindEvent();
    },
    data() {
      return {
        isLoading: false,
        topHeight: false
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

        $(window).scroll(() => {
          this.debounce(this.doTopHeight, 1000)();
        });
      },
      doTopHeight() {
        var top = document.body.scrollTop;
        if (top > 200) {
          this.topHeight = true;
        } else {
          this.topHeight = false;
        }
      },
      debounce(fn, delay) {
        let timer = null;
        return function () {
          let context = this;
          let args = arguments;
          clearTimeout(timer);
          timer = setTimeout(function() {
            fn.apply(context, args);
          }, delay);
        }
      },

      scrollToTop() {
        $('html, body').animate({
          scrollTop: 0
        }, 300);
      },

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
