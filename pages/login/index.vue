<template>
  <v-main class="main">
    <div id="pageLogin" class="compWrapper g-transition">
      <TopBarNav />
      <div class="top-login">
        <br /><br /><br /><br />
        <h2>
          Masuk dengan email<br />
          yang kamu gunakan
        </h2>
      </div>
      <br />
      <div class="google-button">
        <!-- @click="showFormGoogle" -->
        <v-btn
          v-if="hideButtonGoogle === false"
          depressed
          color="primary"
          outlined
          rounded
          @click="authGoogle"
        >
          <img src="~/assets/img/google-ic.png" width="20" /><span
            >Lanjutkan dengan Google</span
          >
        </v-btn>
        <v-form
          v-if="showFormLoginWithGoogle === true"
          ref="formGoogle"
          v-model="validGoogle"
          lazy-validation
          @submit.prevent="submitEmailGoogle($event)"
          @keyup.native.enter="validGoogle && submitEmailGoogle($event)"
        >
          <v-text-field
            id="emailGoogle"
            v-model="emailGoogle"
            outlined
            placeholder="Masukkan email Google"
            required
            prepend-inner-icon="mdi-email-outline"
            :rules="emailRules"
            :clearable="widthClearable"
            clear-icon="mdi-close"
            @blur="widthClearable = false"
            @focus="widthClearable = true"
          ></v-text-field>
          <div class="login-button">
            <v-btn
              depressed
              color="primary"
              rounded
              :disabled="!validGoogle"
              @click="submitEmailGoogle"
            >
              <span>Masuk Google</span>
            </v-btn>
          </div></v-form
        >
      </div>
      <br /><br />
      <span class="do-register"
        >Belum punya akun? <a href="/register">Yuk, daftar!</a></span
      >
    </div>
  </v-main>
</template>
<script>
import { mapActions, mapState } from 'vuex'
const components = {
  IcSeen: () => import('~/components/svg/IcSeen'),
  TopBarNav: () => import('~/components/Topbar'),
}
// const googleBtn = this.$refs(null)
// const googleAuthSetings = this.$refs({
//   clientId: '491456573984-j175qnc1pntjdfrhp6sgui3q6qduatih.apps.googleusercontent.com',
//   scope: 'email',
//   prompt: 'consent',
//   fetch_basic_profile: false,
// })

export default {
  name: 'LoginPage',
  components,
  data() {
    return {
      showpass: false,
      valid: true,
      validGoogle: false,
      refFocus: false,
      showFormLogin: false,
      showFormLoginWithGoogle: false,
      hideButton: false,
      hideButtonGoogle: false,
      emailInput: '',
      passInput: '',
      emailGoogle: '',
      widthClearable: true,
      emailRules: [
        (v) => !!v || 'Email wajib diisi.',
        (v) =>
          v && v.length > 4
            ? /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                v
              ) || 'Format email tidak valid.'
            : 'Email minimal 5 karakter.',
      ],
      // googleAuthSetings,
      // googleBtn
    }
  },
  computed: {
    ...mapState({
      isLogin: (state) => state.user.isLogin,
      isLoginWithGoogle: (state) => state.user.isLoginWithGoogle,
      namaUser: (state) => state.user.nameGoogleAcc,
    }),
  },
  // mounted() {
  //   this.onBeforeMount()
  // },
  methods: {
    ...mapActions({
      doLogin: 'user/postLogin',
      loginWithGoogle: 'user/loginWithGoogle',
    }),
    googleBtn() {
      this.$refs(null)
    },
    googleAuthSetings() {
      this.$refs({
        clientId:
          '491456573984-j175qnc1pntjdfrhp6sgui3q6qduatih.apps.googleusercontent.com',
        scope: 'email',
        prompt: 'consent',
        fetch_basic_profile: false,
      })
    },
    inputEmail(val) {
      this.resetEmail()
      this.emailInput = val.replace(' ', '')
    },
    resetEmail() {
      // this.emailErrorMessage = ''\
    },
    showForm() {
      this.showFormLogin = true
      this.hideButton = true
      this.showFormLoginWithGoogle = false
      this.hideButtonGoogle = false
    },
    showFormGoogle() {
      this.showFormLoginWithGoogle = true
      this.hideButtonGoogle = true
      this.hideButton = false
      this.showFormLogin = false
    },
    submit() {
      const params = {
        email: this.emailInput.toString(),
        password: this.passInput,
      }
      this.doLogin(params)
        .then(() => {
          this.$router.push({ path: '/' })
        })
        .catch((error) => {
          const alertMsg = {
            msg: error,
            timeout: 3000,
            color: 'secondary',
          }
          this.$store.dispatch('ui/showAlert', alertMsg)
        })
    },
    submitEmailGoogle() {
      if (this.$refs.formGoogle.validate()) {
        const params = {
          email: this.emailGoogle,
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
      }
    },
    authGoogle() {
      this.$auth.loginWith('google')
    },
  },
}
</script>
<style scoped>
.top-login {
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 80px;
  margin-bottom: 20px;
}
h2 {
  font-family: Poppins;
  font-weight: 600;
  font-size: 24px;
}
.bottom-button {
  padding-left: 20px;
  padding-right: 20px;
  text-transform: capitalize !important;
  font-family: Poppins;
  font-weight: 500;
  font-size: 16px;
}
.bottom-button span {
  text-transform: capitalize !important;
  font-family: Poppins;
  font-weight: 500;
  font-size: 12px;
  color: #2b67f6;
}
.bottom-button img {
  margin-right: 16px;
}
.google-button {
  padding-left: 20px;
  padding-right: 20px;
  font-family: Poppins;
}
.google-button span {
  text-transform: capitalize !important;
  font-family: Poppins;
  font-weight: 500;
  font-size: 14px;
}
.google-button img {
  margin-right: 16px;
}
.v-btn {
  width: 100% !important;
}
span {
  font-family: Poppins;
}
#pageLogin {
  background: white;
  height: 100vh;
}
.divider {
  display: flex;
  align-items: center;
  text-align: center;
  color: #757575;
  padding-left: 20px;
  padding-right: 20px;
  margin-top: 30px;
  margin-bottom: 30px;
}
.divider span {
  padding: 0px 12px 0px 12px;
}
.divider::before,
.divider::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid #757575;
}

.divider:not(:empty)::before {
  margin-right: 0.25em;
}

.divider:not(:empty)::after {
  margin-left: 0.25em;
}
.do-register {
  margin-left: 20px;
  margin-top: 20px;
  font-size: 12px;
}
.form-icon {
  width: 24px;
  height: 24px;
  cursor: pointer;
}
.login-button {
  position: absolute;
  bottom: 20px;
  left: 0%;
  right: 0%;
  text-align: center;
  margin: 40px 20px;
}
.login-button span {
  color: white;
  text-transform: capitalize !important;
  font-family: Poppins;
  font-weight: 500;
  font-size: 14px;
}
</style>
<style>
.main {
  background: lightgray !important;
}
</style>
