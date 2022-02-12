<template>
  <div id="pageHome" class="compWrapper g-transition home-page">
    <HomeSlide />
  </div>
</template>

<script>
export default {
  name: "HomePage",
  components: {
    HomeSlide: () =>
      import('../../components/HomeSlide.vue' /* webpackChunkName: "HomeSellerInfo" */),
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
<style>
.loaderHome {
  margin-top: 55%;
}
</style>
