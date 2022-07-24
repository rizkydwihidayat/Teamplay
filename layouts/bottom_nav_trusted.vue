<template>
  <v-app>
    <SnackBarMessage />
    <v-main class="main">
      <v-container class="main-container">
        <!-- <OfflineAlert /> -->
        <nuxt />
      </v-container>
    </v-main>
    <BottomNavigationTrusted />
  </v-app>
</template>


<script>
import { mapActions } from 'vuex'
const components = {
  BottomNavigationTrusted: () =>
    import('@/components/BottomNavTrusted.vue' /* webpackChunkName: "BottomNavigation" */),
}
export default {
  components,
  mounted() {
    this.checkLoginGoogle()
  },
  methods: {
    ...mapActions({
      loginWithGoogle: 'user/loginWithGoogle',
    }),
    checkLoginGoogle() {
      const emailUser = this.$auth.user.email
      if (emailUser !== '') {
        try {
          const params = {
            email: emailUser,
          }
          const prevUrl = this.$nuxt.context.from
          this.loginWithGoogle(params)
            .then((resp) => {
              if (prevUrl.fullPath.includes('invitedFrom')) {
                this.$router.push({ path: prevUrl.fullPath })
              } else {
                this.$router.push({ path: '/' })
              }
            })
            .catch((error) => {
              const alertMsg = {
                msg: error,
                timeout: 3000,
                color: 'secondary',
              }
              this.$store.dispatch('ui/showAlert', alertMsg)
            })
        } catch (error) {
          const alertMsg = {
            msg: error,
            timeout: 3000,
            color: 'secondary',
          }
          this.$store.dispatch('ui/showAlert', alertMsg)
        }
      }
    },
  }
}
</script>

<style scoped>
.main-container {
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  padding: 0px;
}
.main {
  background: lightgray;
}
</style>
