<template>
  <v-app>
    <SnackBarMessage />
    <v-content class="main">
      <v-container class="main-container">
        <!-- <OfflineAlert /> -->
        <nuxt />
      </v-container>
    </v-content>
    <BottomNavigation />
  </v-app>
</template>


<script>
// import { mapActions } from 'vuex'
const components = {
//   SnackBarMessage: () =>
//     import('@/components/SnackBarMessage.vue' /* webpackChunkName: "SnackBarMessage" */),
  BottomNavigation: () =>
    import('@/components/BottomNav.vue' /* webpackChunkName: "BottomNavigation" */),
//   OfflineAlert: () =>
//     import('~/components/OfflineAlert.vue' /* webpackChunkName: "OfflineAlert" */)
}
export default {
  components,
//   methods: {
//     ...mapActions({ doLogout: 'user/doLogout' }),
//     logout() {
//       this.doLogout().then(() => {
//         // clear all stora cache
//         this.$store.cache.clear()
//         // console.warn('warn logout')
//         this.$router.replace('/')
//         // console.warn('warn logout done')
//       })
//     },
//     goTo(path) {
//       this.$router.push(path)
//     }
//   }
}
</script>

<style scoped>
.main-container {
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  background: #0D47A1;
}
.main {
  background: lightgray;
}
</style>
