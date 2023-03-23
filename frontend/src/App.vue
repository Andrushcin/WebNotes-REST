<template>
<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css">

<body class="bg-light">
  <div style="min-height: calc(100vh - 50px)">
    <MainNavbar />
    <AlertMessage :message="warning" v-if="warning"/>
    <RouterView @warning="(msg) => warning = msg" />
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
import NotePage from './views/NotePage.vue'
import AlertMessage from './components/AlertMessage.vue'

export default {
  name: "App",
  data () {
    return {
      warning: "",
    }
  },
  methods: {
  },
  components: {
    MainNavbar,
    MainFooter,
    NotesView,
    AlertMessage,
    NotePage,
  },

}
</script>

<style scoped>

</style>
