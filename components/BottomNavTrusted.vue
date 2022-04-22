<template>
<v-main>
  <v-bottom-navigation
    v-if="isTrusted"
    v-model="activeBtn"
    :value="true"
    color="primary"
    fixed
    class="bottomNav"
  >
    <v-btn id="toHome" :ripple="false" text to="/">
      <span class="text-nav">Home</span>
      <img
        v-if="routeName === 'index'"
        src="~/assets/svg/Subtract.svg"
        alt="H"
        width="21"
        class="btmNavImg"
      />
      <img
        v-else
        src="~/assets/svg/Subtract-inactive.svg"
        alt="H"
        width="21"
        class="btmNavImg"
      />
    </v-btn>
    <v-btn id="toOrder" :ripple="false" text :to="linkToMatch">
      <span class="text-nav">Match</span>
      <img
        v-if="routeName === 'my-match'"
        src="~/assets/svg/match.svg"
        alt="H"
        width="21"
        class="btmNavImg"
      />
      <img
        v-else
        src="~/assets/svg/match-inactive.svg"
        width="21"
        alt="H"
        class="btmNavImg"
      />
    </v-btn>
    <v-btn
      id="toAddUser"
      :ripple="false"
      flat
      to="/create-match"
      aria-expanded="false"
      aria-label="Add"
    >
      <IcPlus />
    </v-btn>
    <v-btn id="toProduct" :ripple="false" text :to="linkToSearch">
      <span class="text-nav">Search</span>
      <img
        v-if="routeName === 'search'"
        src="~/assets/svg/search-normal-1.svg"
        width="21"
        alt="H"
        class="btmNavImg"
      />
      <img
        v-else
        src="~/assets/svg/search-normal-inactive.svg"
        width="21"
        alt="H"
        class="btmNavImg"
      />
    </v-btn>
    <v-btn id="toChat" :ripple="false" text :to="linkToAccount">
      <span class="text-nav">Profile</span>
      <img
        v-if="routeName === 'profile'"
        src="~/assets/svg/user-square.svg"
        width="21"
        alt="H"
        class="btmNavImg"
      />
      <img
        v-else
        src="~/assets/svg/user-square-inactive.svg"
        width="21"
        alt="H"
        class="btmNavImg"
      />
    </v-btn>
  </v-bottom-navigation>

  <!-- default navbar -->
  <v-bottom-navigation
    v-if="isDefault"
    v-model="activeBtn"
    :value="true"
    fixed
    color="primary"
    app
    class="bottomNav"
  >
    <v-btn id="toHome" :ripple="false" text to="/">
      <span class="text-nav">Home</span>
      <img
        v-if="routeName === 'index'"
        src="~/assets/svg/Subtract.svg"
        alt="H"
        width="21"
        class="btmNavImg"
      />
      <img
        v-else
        src="~/assets/svg/Subtract-inactive.svg"
        alt="H"
        width="21"
        class="btmNavImg"
      />
    </v-btn>
    <v-btn id="toOrder" :ripple="false" text :to="linkToMatch">
      <span class="text-nav">Match</span>
      <img
        v-if="
          routeName === 'match'
        "
        src="~/assets/svg/match.svg"
        alt="H"
        width="21"
        class="btmNavImg"
      />
      <img
        v-else
        src="~/assets/svg/match-inactive.svg"
        width="21"
        alt="H"
        class="btmNavImg"
      />
    </v-btn>
    <v-btn id="toProduct" :ripple="false" text :to="linkToSearch">
      <span class="text-nav">Search</span>
      <img
        v-if="routeName === 'search'"
        src="~/assets/svg/search-normal-1.svg"
        width="21"
        alt="H"
        class="btmNavImg"
      />
      <img
        v-else
        src="~/assets/svg/search-normal-inactive.svg"
        width="21"
        alt="H"
        class="btmNavImg"
      />
    </v-btn>
    <v-btn id="toChat" :ripple="false" text :to="linkToAccount">
      <span class="text-nav">Profile</span>
      <img
        v-if="routeName === 'profile'"
        src="~/assets/svg/user-square.svg"
        width="21"
        alt="H"
        class="btmNavImg"
      />
      <img
        v-else
        src="~/assets/svg/user-square-inactive.svg"
        width="21"
        alt="H"
        class="btmNavImg"
      />
    </v-btn>
  </v-bottom-navigation>

  <!-- not login navbar -->
  <v-bottom-navigation
    v-if="isNotLogin"
    v-model="activeBtn"
    :value="true"
    fixed
    color="primary"
    app
    class="bottomNav"
  >
    <v-btn id="toHome" :ripple="false" text to="/">
      <span class="text-nav">Home</span>
      <img
        v-if="routeName === 'index'"
        src="~/assets/svg/Subtract.svg"
        alt="H"
        width="21"
        class="btmNavImg"
      />
      <img
        v-else
        src="~/assets/svg/Subtract-inactive.svg"
        alt="H"
        width="21"
        class="btmNavImg"
      />
    </v-btn>
    <v-btn id="toProduct" :ripple="false" text :to="linkToSearch">
      <span class="text-nav">Search</span>
      <img
        v-if="routeName === 'search'"
        src="~/assets/svg/search-normal-1.svg"
        width="21"
        alt="H"
        class="btmNavImg"
      />
      <img
        v-else
        src="~/assets/svg/search-normal-inactive.svg"
        width="21"
        alt="H"
        class="btmNavImg"
      />
    </v-btn>

    <v-btn id="toOrder" :ripple="false" text :to="linkToLogin">
      <span class="text-nav">Masuk</span>
      <img
        src="~/assets/svg/login.svg"
        alt="H"
        width="21"
        class="btmNavImg"
      />
    </v-btn>
  </v-bottom-navigation>
</v-main>
</template>
<script>
import IcPlus from '~/components/svg/IcPlus'
export default {
    components: {
       IcPlus 
    },
    data() {
    return {
      activeBtn: '/',
      linkToMatch: '/my-match',
      linkToSearch: '/search',
      linkToAccount: '/profile',
      linkToLogin: '/login',
      isNotLogin: false,
      isTrusted: false,
      isDefault: false
    }
  },
  computed: {
    routeName: {
      get() {
        return this.$route.name
      },
    },
  },
  mounted() {
    const token = localStorage.getItem('accKey')
    if (token === "") {
      this.isNotLogin = true
    } else if (token !== "") {
      this.isDefault = true
    }
  }
}
</script>
<style scoped>
.v-item-group.v-bottom-nav {
  box-shadow: 0 3px 14px 2px rgba(0, 0, 0, 0) !important;
}

/* .bottomNav {
  background: -webkit-radial-gradient(
    50% 23%,
    circle,
    transparent 32px,
    rgb(255, 255, 255) 33px
  ) !important;
  filter: drop-shadow(0 -3px 5px rgba(0, 0, 0, 0.15)) !important;
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
    font-weight: 500;
    font-family: Poppins;
}
/* .bottomNav > a > .v-btn__content > span {
  font-size: 10px;
  padding-top: 5px;
  font-weight: 400;
  font-style: normal;
  font-stretch: normal;
  color: rgba(16, 69, 91, 0.8);
} */
.bottomNav > .v-btn {
  min-width: 24px !important;
  max-width: 128px !important;
}

#toAddUser {
  border-radius: 100%;
  background-color: #DFE7FF !important;
  margin-top: -25px;
  min-width: 56px !important;
  max-width: 56px !important;
  margin-right: 10px;
  margin-left: 10px;
}
.totalDraft {
  background: var(--v-coral-base);
  width: 10px;
  height: 10px;
  z-index: 50;
  border-radius: 100%;
  padding-top: 2px;
  position: fixed;
  margin-left: 10px;
  top: 5px;
  align-content: center;
}
/* @media (min-width: 960px) and (max-width: 1024px) {
  .bottomNav > .v-btn {
    min-width: 24px !important;
    max-width: 184px !important;
  }
} */
/* start: hardstyle to remove transition effect on bottomNav active */
.v-item-group.v-bottom-nav .v-btn--active {
  padding-top: 8px;
}
/* end: hardstyle to remove transition effect on bottomNav active */
</style>
