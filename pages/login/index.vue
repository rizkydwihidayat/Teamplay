<template>
  <v-content class="main">
    <div id="pageLogin" class="compWrapper g-transition">
      <div class="top-login">
        <h2>
          Masuk dengan email<br />
          yang kamu gunakan
        </h2>
      </div>
      <br />
      <div class="google-button">
        <v-btn depressed color="primary" outlined rounded>
          <img src="~/assets/img/google-ic.png" width="20" /><span
            >Lanjutkan dengan Google</span
          >
        </v-btn>
      </div>
      <div class="divider"><span>atau</span></div>
      <div class="bottom-button">
        <v-text-field
          ref="emailAddress"
          outlined
          label="Email"
          required
          :error-messages="emailErrorResponse"
          validate-on-blur
          prepend-inner-icon="mdi-email-outline"
          @input="(val) => inputEmail(val)"
          @focus="resetEmail"
        ></v-text-field>
        <v-text-field
          :type="showpass ? 'text' : 'password'"
          :validate-on-blur="true"
          browser-autocomplete="password"
          autocomplete="password"
          required
          outlined
          label="Password"
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
      </div>
      <br />
      <span class="do-register"
        >Belum punya akun? <a href="">Yuk Daftar!</a></span
      >
      <div class="login-button">
      <v-btn depressed color="primary" rounded>
        <span>Masuk</span>
      </v-btn>
    </div>
    </div>
  </v-content>
</template>
<script>
const components = {
  IcSeen: () => import('~/components/svg/IcSeen'),
}
export default {
  name: 'LoginPage',
  components,
  data: () => ({
    showpass: false,
    valid: false,
    refFocus: false,
    emailInput: '',
    // emailErrorMessage: ''
  }),
  methods: {
    inputEmail(val) {
      this.resetEmail()
      this.emailInput = val.replace(' ', '')
    },
    resetEmail() {
      // this.emailErrorMessage = ''\
    },
  },
}
</script>
<style scoped>
.top-login {
  /* background: white !important; */
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
  font-family: Poppins;
  font-weight: 500;
  font-size: 12px;
  color: #2b67f6;
}
.google-button {
  padding-left: 20px;
  padding-right: 20px;
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
  position:absolute;
    bottom: 5px;
    left: 0%;
    right: 0%;
    text-align: center;
    margin: 40px 20px;
}
.login-button span {
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