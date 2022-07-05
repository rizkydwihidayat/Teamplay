<template>
  <v-snackbar
    v-model="snackbar"
    :timeout="snackTimeout"
    :top="true"
    :multi-line="true"
    :color="snackbarColor"
  >
    <div>
      {{ snackbarText }}
      <nuxt-link
        v-if="needAction"
        class="white--text link-text"
        :to="redirectTo"
        @click.native="snackbar=false"
      >{{actionText}}</nuxt-link>
    </div>
    <v-btn :ripple="false" class="btn" @click="snackbar = false">
      <span>Back</span>
    </v-btn>
  </v-snackbar>
</template>

<script>
// import { mapActions, mapState } from 'vuex'
export default {
  computed: {
    snackbar: {
      get() {
        return this.$store.state.ui.snackbar
      },
      set(val) {
        this.$store.commit('ui/setState', { snackbar: val })
      }
    },
    snackTimeout: {
      get() {
        return this.$store.state.ui.snackTimeout
      },
      set(val) {
        this.$store.commit('ui/setState', { snackTimeout: val })
      }
    },
    snackbarText: {
      get() {
        return this.$store.state.ui.snackbarText
      },
      set(val) {
        this.$store.commit('ui/setState', { snackbarText: val })
      }
    },
    snackbarColor: {
      get() {
        return this.$store.state.ui.snackbarColor
      },
      set(val) {
        this.$store.commit('ui/setState', { snackbarColor: val })
      }
    },
    needAction: {
      get() {
        return this.$store.state.ui.needAction
      },
      set(val) {
        this.$store.commit('ui/setState', { needAction: val })
      }
    },
    actionText: {
      get() {
        return this.$store.state.ui.actionText
      },
      set(val) {
        this.$store.commit('ui/setState', { actionText: val })
      }
    },
    redirectTo: {
      get() {
        return this.$store.state.ui.redirectTo
      },
      set(val) {
        this.$store.commit('ui/setState', { redirectTo: val })
      }
    }
  }
  // created: function() {
  //   this.$store.watch(
  //     state => state.ui.snackbarText,
  //     () => {
  //       const msg = this.$store.state.ui.snackbarText
  //       // clear message on timeout
  //       if (msg !== '') {
  //         setTimeout(() => {
  //           this.snackbarText = ''
  //         }, this.snackTimeout)
  //       }
  //     }
  //   )
  // }
}
</script>

<style>
.v-snack__wrapper {
  max-width: 480px !important;
  /* width: 100% !important; */
  text-align: center !important;
  font-family: Poppins;
  margin: 16px;
}
.link-text {
  margin-left: 0;
  text-decoration: underline;
}
.btn {
  text-transform: capitalize;
  font-family: Poppins;
  font-size: 12px !important;
  margin-top: 10px;
}
</style>