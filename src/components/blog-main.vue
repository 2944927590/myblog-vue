<template>
  <main class="page-body">
    <div class="container">
      <div class="row">
        <blog-side></blog-side>
        <router-view></router-view>
      </div>
    </div>
  </main>
</template>

<script>
  import blogSide from './blog-side.vue'
  import blogContent from './blog-content.vue'

  export default {

    name: 'blog-main',

    components: {
      'blogSide': blogSide,
      'blogContent': blogContent
    },

    data() {
      return {

      }
    },

    mounted() {
      this.$nextTick(function () {
        
      });
    },

    methods: {

    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

