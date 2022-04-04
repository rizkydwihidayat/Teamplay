<template>
  <v-content class="main">
    <div id="pageLogin" class="compWrapper g-transition">
      <TopBarNav />
      <div class="top-login">
        <h2>
          Masuk dengan email<br />
          yang kamu gunakan
        </h2>
      </div>
      <br />
      <div class="google-button">
        <v-btn
          v-if="hideButtonGoogle === false"
          depressed
          color="primary"
          outlined
          rounded
          @click="showFormGoogle"
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
          @keyup.native.enter="valid && submitEmailGoogle($event)"
        >
          <v-text-field
            id="emailGoogle"
            v-model="emailGoogle"
            outlined
            placeholder="Masukkan email Google"
            required
            validate-on-blur
            prepend-inner-icon="mdi-email-outline"
            @input="(val) => inputEmail(val)"
            @focus="resetEmail"
          ></v-text-field>
          <div class="login-button">
            <v-btn depressed color="primary" rounded @click="submitEmailGoogle">
              <span>Masuk Google</span>
            </v-btn>
          </div></v-form
        >
      </div>
      <div class="divider"><span>atau</span></div>
      <div class="bottom-button">
        <v-btn
          v-if="hideButton === false"
          depressed
          color="gray"
          outlined
          rounded
          @click="showForm"
        >
          <img src="~/assets/img/email.png" width="20" /><span
            >Masuk dengan Email</span
          >
        </v-btn>
        <v-form
          v-if="showFormLogin === true"
          ref="form"
          v-model="valid"
          lazy-validation
          @keyup.native.enter="valid && submit($event)"
        >
          <v-text-field
            ref="emailAddress"
            v-model="emailInput"
            outlined
            placeholder="Email"
            required
            type="text"
            validate-on-blur
            prepend-inner-icon="mdi-email-outline"
            @input="(val) => inputEmail(val)"
            @focus="resetEmail"
          ></v-text-field>
          <v-text-field
            v-model="passInput"
            :type="showpass ? 'text' : 'password'"
            :validate-on-blur="true"
            autocomplete="password"
            required
            outlined
            placeholder="Password"
            prepend-inner-icon="mdi-key-outline"
            :maxlength="27"
            @click:append="showpass = !showpass"
          >
            <template #append>
              <div @click="showpass = !showpass">
                <IcSeen v-if="!showpass" class="form-icon" />
                <IcSeen v-else :reveal="true" class="form-icon" />
              </div>
            </template>
          </v-text-field>
          <span>Lupa Password?</span>
          <div class="login-button">
            <v-btn depressed color="primary" rounded @click="submit">
              <span>Masuk</span>
            </v-btn>
          </div>
        </v-form>
      </div>
      <br />
      <span class="do-register"
        >Belum punya akun? <a href="/register">Yuk, daftar!</a></span
      >
    </div>
    {{ namaUser }}
  </v-content>
</template>
<script>
import { mapActions, mapState } from 'vuex'
const components = {
  IcSeen: () => import('~/components/svg/IcSeen'),
  TopBarNav: () => import('~/components/Topbar'),
}

export default {
  name: 'LoginPage',
  components,
  data() {
    return {
      showpass: false,
      valid: false,
      validGoogle: false,
      refFocus: false,
      showFormLogin: false,
      showFormLoginWithGoogle: false,
      hideButton: false,
      hideButtonGoogle: false,
      emailInput: '',
      passInput: '',
      emailGoogle: '',
    }
  },
  computed: {
    ...mapState({
      isLogin: (state) => state.user.isLogin,
      namaUser: (state) => state.user.nameGoogleAcc,
    }),
  },
  methods: {
    ...mapActions({
      doLogin: 'user/postLogin',
      loginWithGoogle: 'user/loginWithGoogle',
    }),
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
          if (this.isLogin) {
            this.$router.push('/')
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    submitEmailGoogle() {
      if (this.$refs.formGoogle.validate()) {
        console.warn(this.emailGoogle);
        const params = {
          email: this.emailGoogle,
        }
        this.loginWithGoogle(params)
          .then(() => {
            if (this.isLogin) {
              this.$router.push('/')
            }
          })
          .catch((error) => {
            console.log(error)
          })
      }
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
  bottom: 5px;
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
