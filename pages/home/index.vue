<template>
  <div id="pageHome" class="compWrapper g-transition">
    <HomeSearch />
    <HomeCategory />
    <HomeCarousel />
    <HomeMatchLocation />
  </div>
</template>

<script>
export default {
  name: "HomePage",
  components: {
    HomeSearch: () =>
      import('../../components/HomeSearch.vue' /* webpackChunkName: "HomeSellerInfo" */),
    HomeCategory: () =>
      import('../../components/HomeCategory.vue' /* webpackChunkName: "HomeSellerInfo" */),
    HomeCarousel: () =>
      import('../../components/HomeCarousel.vue' /* webpackChunkName: "HomeSellerInfo" */),
    HomeMatchLocation: () =>
      import('../../components/HomeMatchLocation.vue' /* webpackChunkName: "HomeSellerInfo" */)
  },
  layout: 'bottom_nav',
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
  },
}
</script>
<style scoped>
.home-page {
  background: white !important;
}
</style>
