<template>
  <div class="back-top" >
    <span class="glyphicon glyphicon-menu-up" @click="scrollToTop"></span>
  </div>
</template>

<script>

export default {

  name: 'blog-back-top',

  data() {
    return {

    }
  },

  created() {

  },

  methods: {
    scrollToTop() {
      $('html, body').animate({
        scrollTop: 0
      }, 300);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .back-top {
    width: 40px;
    height: 35px;
    display: inline-block;
    position: fixed;
    right: 0px;
    bottom: 50px;
    background-color: #ADB5A6;
    border-color: #ADB5A6;
  }
  .back-top span {
    font-size: 30px;
    padding: 2px 5px;
    color: #fff;
    cursor: pointer;
  }
  .back-top span:hover {
    background-color: #74796F;
    border-color: #74796F;
  }
</style>

