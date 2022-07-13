<template>
  <v-app>
    <SnackBarMessage />
    <v-main class="main">
      <v-container class="main-container">
        <!-- <OfflineAlert /> -->
        <nuxt />
      </v-container>
    </v-main>
    <!-- <BottomNavigation /> -->
  </v-app>
</template>


<script>
export default {
  name: "DefaultNav",
}
</script>

<style scoped>
.main-container {
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  background: white;
  padding: 0px;
}
</style>
