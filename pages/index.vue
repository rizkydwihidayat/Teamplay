<template>
<v-main>
  <div id="pageHome" class="compWrapper g-transition page">
    <HomeSearch />
    <HomeCategory />
  </div>
</v-main>
</template>

<script>
import 'leaflet/dist/leaflet.css'
import 'leaflet-geosearch/dist/geosearch.css'
export default {
  name: "HomePage",
  components: {
    HomeSearch: () =>
      import('../components/HomeSearch.vue' /* webpackChunkName: "HomeSellerInfo" */),
    HomeCategory: () =>
      import('../components/HomeCategory.vue' /* webpackChunkName: "HomeSellerInfo" */),
  },
  // layout: 'bottom_nav',
  layout: 'bottom_nav_trusted',
  // middleware: 'auth',
  head() {
    return {
      title: 'Home',
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'home_default',
          name: 'description',
          content: 'Home default',
        },
        {
          hid: 'home_default_keywords',
          name: 'keywords',
          content: 'home, home-default',
        },
      ],
    }
  }
}
</script>
<style>
.v-main {
  background: lightgray !important;
  padding: 0px !important;
}
</style>