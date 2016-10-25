<template>
  <main class="page-body">
    <div class="container">
      <div class="row">
        <blog-side></blog-side>
        <blog-content></blog-content>
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

    created() {

    },

    methods: {

    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

