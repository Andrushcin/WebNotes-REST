<template>
<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css">

<body class="bg-light">
  <div style="min-height: calc(100vh - 50px)">
    <MainNavbar />
    <RouterView />
  </div>
</body>
<MainFooter />
</template>

<script>
/* eslint-disable */
import { RouterView } from 'vue-router'
import MainNavbar from './components/MainNavbar.vue'
import MainFooter from './components/MainFooter.vue'
import NotesView from './views/NotesView.vue'

export default {
  name: "App",
  components: {
    MainNavbar,
    MainFooter,
    NotesView,
  }
}
</script>

<style scoped>

</style>
