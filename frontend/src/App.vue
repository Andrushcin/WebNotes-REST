<template>
<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css">
<link rel="shortcut icon" type="image/png" href="./assets/icons/favicon.png"/>

<body class="bg-info" style="min-height: calc(100vh - 50px)">
	<div v-if="width < 555">
		<MainNavbar/>
		<AlertMessage :message="alertMsg.message" :type="alertMsg.type"/>
		<RouterView @alert-message="(alert) => this.alertMsg = alert"/>
	</div>
	<div v-else>
		<SimpleNavbar />
		<div class="d-flex flex-row">
			<LeftPanel style="min-height: calc(100vh - 50px - 55px - 40px)"/>
			<div class="d-flex flex-column mx-auto w-100" style="max-width: 600px;">
				<AlertMessage :message="alertMsg.message" :type="alertMsg.type"/>
				<RouterView @alert-message="(alert) => this.alertMsg = alert"/>
			</div>
		</div>
	</div>
</body>
<MainFooter :theme="theme"/>
</template>

<script>
/* eslint-disable */
import { RouterView } from 'vue-router'
import MainNavbar from './components/MainNavbar.vue'
import SimpleNavbar from './components/SimpleNavbar.vue'
import LeftPanel from './components/LeftPanel.vue'
import MainFooter from './components/MainFooter.vue'
import NotesView from './views/NotesView.vue'
import NotePage from './views/NotePage.vue'
import AlertMessage from './components/AlertMessage.vue'

export default {
  name: "App",
  data () {
    return {
      alertMsg: Object,
      theme: "dark",
      width: this.getSize(),
    }
  },
  created() {
    window.addEventListener("resize", () => {this.width = this.getSize()});
  },

  methods: {
    getSize() {
        return window.innerWidth;
      }
  },
  components: {
    MainNavbar,
    SimpleNavbar,
    MainFooter,
    NotesView,
    AlertMessage,
    NotePage,
	LeftPanel,
  },

}
</script>

<style scoped>

</style>
