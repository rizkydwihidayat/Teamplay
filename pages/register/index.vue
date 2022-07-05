<template>
  <v-main class="main">
    <div id="pageRegister" class="compWrapper g-transition">
      <TopBarNav />
      <div v-if="hideTop === false" class="top-register">
        <h2>Yuk, daftar!</h2>
        <span
          >Jangan khawatir, data kamu akan kami<br />
          lindungi sepenuh hati.</span
        >
      </div>
      <br />
      <div v-if="hideTop === false" class="google-button">
        <v-btn depressed color="primary" outlined rounded @click="showForm">
          <img src="~/assets/img/google-ic.png" width="20" /><span
            >Lanjutkan dengan Google</span
          >
        </v-btn>
      </div>
      <div v-if="hideTop === false" class="divider"><span>atau</span></div>
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
            >Daftar dengan Email</span
          >
        </v-btn>
        <v-form
          v-if="showFormRegister === true"
          ref="form"
          v-model="valid"
          lazy-validation
          @keyup.native.enter="valid && submit($event)"
        >
          <div>
            <br /><br /><br /><br />
            <h2 v-if="isRegister1 === true">Daftar dengan email</h2>
          </div>
          <br />
          <v-text-field
            v-if="isRegister1 === true"
            ref="emailAddress"
            v-model="emailInput"
            outlined
            required
            placeholder="Daftar dengan Email"
            prepend-inner-icon="mdi-email-outline"
            @input="(val) => inputEmail(val)"
            @focus="resetEmail"
          ></v-text-field>
          <v-text-field
            v-if="isRegister1 === true"
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
          <div class="login-button">
            <v-btn
              v-if="isRegister1 === true"
              depressed
              color="primary"
              rounded
              @click="nextForm"
            >
              <span>Daftar</span>
            </v-btn>
            <v-btn
              v-if="isRegister2 === true"
              depressed
              color="primary"
              rounded
              @click="submitForm"
            >
              <span>Simpan</span>
            </v-btn>
          </div>
          <div>
            <h2 v-if="isRegister2 === true">Yuk, lengkapin data kamu dulu!</h2>
          </div>
          <br />
          <v-text-field
            v-if="isRegister2 === true"
            ref="fullName"
            v-model="fullname"
            outlined
            required
            placeholder="Nama lengkap kamu"
          ></v-text-field>
          <v-text-field
            v-if="isRegister2 === true"
            ref="age"
            v-model="age"
            outlined
            required
            placeholder="Usia kamu sekarang"
            @keypress="checkValue($event)"
          ></v-text-field>
          <v-radio-group v-if="isRegister2 === true" v-model="radioGroup">
            <v-radio label="Laki-laki" value="M"></v-radio>
            <v-radio label="Perempuan" value="F"></v-radio>
            <v-radio label="Tidak Mau Menyebutkan" value="X"></v-radio>
          </v-radio-group>
        </v-form>
      </div>
      <br />
      <span v-if="hideTop === false" class="do-register"
        >Suda punya akun? <a href="/login">Yuk, masuk!</a></span
      >
    </div>
  </v-main>
</template>
<script>
import { mapActions } from 'vuex'
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
      showFormRegister: false,
      hideButton: false,
      emailInput: '',
      passInput: '',
      isRegister1: false,
      isRegister2: false,
      radioGroup: 'M',
      hideTop: false,
      fullname: '',
      age: '',
    }
  },
  methods: {
    ...mapActions({
      doRegister: 'user/postRegister',
    }),
    inputEmail(val) {
      this.resetEmail()
      this.emailInput = val.replace(' ', '')
    },
    resetEmail() {
      // this.emailErrorMessage = ''\
    },
    showForm() {
      this.showFormRegister = true
      this.hideButton = true
      this.isRegister1 = true
      this.hideTop = true
    },
    nextForm() {
      this.isRegister1 = false
      this.isRegister2 = true
      this.hideTop = true
    },
    submitForm() {
      const params = {
        name: this.fullname,
        email: this.emailInput,
        password: this.passInput,
        gender: this.radioGroup,
        age: parseInt(this.age),
      }
      this.doRegister(params)
        .then(() => {
          this.$router.push('/')
        })
        .catch((error) => {
          console.log(error)
        })
    },
    checkValue(evt) {
      evt = evt || window.event
      const charCode = evt.which ? evt.which : evt.keyCode
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        evt.preventDefault()
      } else {
        return true
      }
    },
  },
}
</script>
<style scoped>
.top-register {
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 80px;
  margin-bottom: 20px;
}
.top-register span {
  font-size: 18px;
  text-align: justify;
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
.bottom-button img {
  margin-right: 16px;
}
.bottom-button span {
  font-family: Poppins;
  font-weight: 500;
  font-size: 12px;
  color: #2b67f6;
  text-transform: capitalize !important;
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
#pageRegister {
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
