<template>
  <v-bottom-navigation
    v-model="activeBtn"
    :value="true"
    absolute
    color="primary"
    app
    class="bottomNav"
  >
    <v-btn id="toHome" :ripple="false" text to="/home">
      <span class="text-nav">Home</span>
      <img
        v-if="routeName === 'home'"
        src="~/assets/svg/home.svg"
        alt="H"
        width="21"
        class="btmNavImg"
      />
      <img
        v-else
        src="~/assets/svg/home-inactive.svg"
        alt="H"
        width="21"
        class="btmNavImg"
      />
    </v-btn>
    <v-btn id="toOrder" :ripple="false" text :to="linkToMatch">
      <span class="text-nav">My Match</span>
      <img
        v-if="
          routeName === 'my-match'
        "
        src="~/assets/svg/calendar.svg"
        alt="H"
        width="21"
        class="btmNavImg"
      />
      <img
        v-else
        src="~/assets/svg/calendar-inactive.svg"
        width="21"
        alt="H"
        class="btmNavImg"
      />
    </v-btn>
    <v-btn id="toProduct" :ripple="false" text :to="linkToSearch">
      <span class="text-nav">Search</span>
      <img
        v-if="routeName === 'search'"
        src="~/assets/svg/search.svg"
        width="21"
        alt="H"
        class="btmNavImg"
      />
      <img
        v-else
        src="~/assets/svg/search-inactive.svg"
        width="21"
        alt="H"
        class="btmNavImg"
      />
    </v-btn>
    <v-btn id="toChat" :ripple="false" text :to="linkChat">
      <span class="text-nav">Profile</span>
      <img
        v-if="routeName === 'profile'"
        src="~/assets/svg/portrait.svg"
        width="21"
        alt="H"
        class="btmNavImg"
      />
      <img
        v-else
        src="~/assets/svg/portrait-inactive.svg"
        width="21"
        alt="H"
        class="btmNavImg"
      />
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
// console.warn('.$route.path', this.$nuxt.$route.path)
// const envProd = process.env.NODE_ENV === 'production'
export default {
  data() {
    return {
      activeBtn: '/home',
      // linkToMatch: '/my-match',
      // linkToSearch: '/search',
      // linkToAccount: '/profile',
    }
  },
  computed: {
    routeName: {
      get() {
        return this.$route.name
      },
    },
  },
}
</script>

<style scoped>
/* @media (max-width: 767px) {
  .bottomNavSeller {
    margin: 0 auto;
  }
} */
.bottomNav {
  max-width: 480px !important;
  margin: auto !important;
  left: 0 !important;
  right: 0 !important;
  position: fixed;
  bottom: 0;
  background: white;
  height: 60px;
  padding: 5px;
}
.bottomNav >>> .v-btn {
  background: none;
}
.text-nav {
    text-transform: capitalize;
    /* margin: 3px; */
    padding: 5px;
    font-weight: 600;
}
</style>
<style>
/* start: hardstyle to remove transition effect on bottomNav active */
.v-item-group.v-bottom-nav .v-btn--active {
  padding-top: 8px;
}
/* end: hardstyle to remove transition effect on bottomNav active */
</style>
