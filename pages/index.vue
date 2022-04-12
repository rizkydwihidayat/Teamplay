<template>
<v-main>
  <div id="pageHome" class="compWrapper g-transition">
    <HomeSearch />
    <HomeCategory />
  </div>
</v-main>
</template>

<script>
import { mapState } from 'vuex'
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
  computed: {
    ...mapState({
      isLoading: (state) => state.match.isLoading,
    }),
  },
}
</script>
<style>
.main {
  background: lightgray !important;
  padding: 0px 0px !important;
}
</style>