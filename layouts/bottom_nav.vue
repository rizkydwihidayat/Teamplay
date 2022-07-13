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
}
</script>

<style scoped>
.main-container {
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  padding: 0px;
  /* background: #0D47A1; */
}
.main {
  background: lightgray;
}
</style>
