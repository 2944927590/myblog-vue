<template>
  <footer class="page-foot">
    <div class="foot-line"></div>
    <div class="copyright">
      ©2017
      <a target="_blank" href="https://github.com/2944927590">alsy</a>
    </div>
  </footer>
</template>

<script>

export default {

  name: 'blog-footer',

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
  footer {
    margin-top: 20px;
    padding-bottom: 10px;
  }
  .foot-line {
    height: 1px;
    border-top: 1px solid #e5e5e5;
    margin-bottom: 20px;
  }
  .copyright {
    text-align: center;
  }
</style>

