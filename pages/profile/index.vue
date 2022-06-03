<template>
  <div class="g-transition page">
    <div class="top-section">
      <div>
        <v-btn icon :ripple="false" class="btnBack" @click="back">
          <img
            width="24"
            height="24"
            src="~/assets/svg/ic-back-cevron-white.svg"
            alt="<"
          />
        </v-btn>
        <v-layout row wrap class="">
          <v-flex xs2 s2 class="avatar">
            <span>{{ initialName }}</span>
          </v-flex>
          <v-flex xs7 s7 class="profile-name">
            <span class="name">{{ namaUser }}</span
            ><br />
            <v-chip v-if="isTrustedMember === false" color="#eeeeee33" small
              >Member
            </v-chip>
            <v-chip v-else color="#eeeeee33" small>Trusted Member </v-chip>
            <br />
            <span class="point"
              >Poinku
              <img width="12" height="12" src="~/assets/svg/alert.svg" alt="<"
            /></span>
            <div class="progress">
              <div class="progress-bar">{{userPoint}}</div>
            </div>
            <br />
          </v-flex>
        </v-layout>
      </div>
    </div>
    <div v-if="isLoading" class="align-center">
      <v-progress-circular
        color="#0d47a1"
        :indeterminate="isLoading"
        :size="35"
        :width="2"
      ></v-progress-circular>
    </div>
    <div v-else>
      <h3>Profile</h3>
      <v-layout row wrap class="info-pribadi">
        <v-flex xs6 s6>
          <span>Info Pribadi</span>
        </v-flex>
        <v-flex xs6 s6 class="btn-detail"
          ><img
            width="24"
            height="24"
            src="~/assets/svg/ic-back-cevron.svg"
            alt="<"
          />
        </v-flex>
      </v-layout>
      <hr class="hr-divider" />
      <v-layout row wrap class="info-pribadi">
        <v-flex xs6 s6>
          <span>No. Handphone</span
          ><span class="text-right">{{ userPhone }}</span>
        </v-flex>
        <v-flex xs6 s6 class="btn-detail">
          <img
            width="24"
            height="24"
            src="~/assets/svg/ic-back-cevron.svg"
            alt="<"
          />
        </v-flex>
      </v-layout>
      <hr class="hr-divider" />
      <v-layout row wrap class="info-pribadi">
        <v-flex xs6 s6>
          <span>Email</span> <span class="text-right">{{ userEmail }}</span>
          <span class="text-right">{{ userPhone }}</span>
        </v-flex>
        <v-flex xs6 s6 class="btn-detail">
          <img
            width="24"
            height="24"
            src="~/assets/svg/ic-back-cevron.svg"
            alt="<"
          />
        </v-flex>
      </v-layout>
      <hr class="hr-divider" />
      <v-layout v-if="!isLoginWithGoogle" row wrap class="info-pribadi" @click="changePass">
        <v-flex xs6 s6>
          <span>Ubah Password</span>
        </v-flex>
        <v-flex xs6 s6 class="btn-detail"
          ><img
            width="24"
            height="24"
            src="~/assets/svg/ic-back-cevron.svg"
            alt="<"
          />
        </v-flex>
      </v-layout>
      <hr class="hr-divider" />
      <br /><br />
      <v-layout row wrap class="logout">
        <v-flex xs6 s6 @click="goSignOut">
          <span>Keluar</span>
        </v-flex>
        <v-flex xs6 s6> </v-flex>
      </v-layout>
      <hr class="hr-divider" />
      <v-layout row wrap class="version">
        <v-flex xs6 s6>
          <span>Version 0.1.1</span>
        </v-flex>
        <v-flex xs6 s6> </v-flex>
      </v-layout>
      <hr class="hr-divider" />
    </div>
    <v-dialog
      v-model="showdialogchangepass"
      transition="dialog-bottom-transition wrap-400"
    >
      <v-card class="modalShare">
        <v-card-title class="headerModal mt-2">
          <v-layout row wrap>
            <v-flex xs2 s2 class="close-modal">
              <div class="align-right" @click="closeDialogPass">X</div>
            </v-flex>
            <v-flex xs6 s6>
              <span class="title-filter">Ubah Password</span>
            </v-flex>
          </v-layout>
        </v-card-title>
        <hr class="hr-divider" />
        <v-card-text>
          <div>
            <p>Password Baru</p>
            <v-form
              ref="formPass"
              v-model="validPass"
              lazy-validation
              @keyup.native.enter="valid && submitChangePass($event)"
            >
              <v-text-field
                v-model="passInput"
                :type="showpass ? 'text' : 'password'"
                :validate-on-blur="true"
                autocomplete="password"
                required
                outlined
                placeholder="Password"
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
                  depressed
                  color="primary"
                  rounded
                  :disabled="!validPass"
                  @click="submitChangePass"
                >
                  <span>Simpan</span>
                </v-btn>
              </div></v-form
            >
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
const components = {
  IcSeen: () => import('~/components/svg/IcSeen'),
}
export default {
  name: 'ProfilePage',
  components,
  data() {
    return {
      initialName: '',
      showBtnTrusted: false,
      isTrustedMember: false,
      showdialogchangepass: false,
      oldPass: false,
      showpass: false,
      passInput: '',
      validPass: true,
      nameUser: '',
    }
  },
  computed: {
    ...mapState({
      userPoint: (state) => state.user.userPoint,
      userEmail: (state) => state.user.userEmail,
      userPhone: (state) => state.user.userPhone,
      // namaUser: (state) => state.user.nameGoogleAcc,
      isLoginWithGoogle: (state) => state.user.isLoginWithGoogle,
      isLoading: (state) => state.user.isLoading,
    }),
  },
  async mounted() {
    await this.getProfile()
    this.checkPoint(this.userPoint)
    this.initialName = localStorage.getItem('nameGoogleAcc')

  },
  methods: {
    ...mapActions({
      changePassword: 'user/changePassword',
    }),
    back() {
      this.$store.$router.push('/')
    },
    async getProfile(store = this.$store) {
      const bearer = localStorage.getItem('accKey')
      const userID = localStorage.getItem('userID')
      await store.dispatch('user/getUserProfile', { bearer, userID })
      // this.initialName = this.namaUser
        // .split(' ')
        // .map((x) => x[0].toUpperCase())
        // .join('')
    },
    goSignOut() {
      localStorage.clear();
      this.$store.$router.push('/login')
    },
    changePass() {
      this.showdialogchangepass = true
    },
    closeDialogPass() {
      this.showdialogchangepass = false
    },
    checkPoint(point) {
      if (point >= 0 && point < 100) {
        const bar = document.getElementsByClassName('progress-bar')[0]
        const width = 20 + '%'
        bar.style.width = width
      } else if (point === 100) {
        this.showBtnTrusted = true
      }
    },
    submitChangePass() {
      if (this.$refs.formPass.validate()) {
        const bearer = localStorage.getItem('accKey')
        const userID = localStorage.getItem('userID')
        const params = {
          password: this.passInput,
        }
        this.changePassword({params, bearer, userID})
          .then((resp) => {
            console.warn(resp);
            if (this.isLoginWithGoogle) {
              this.$router.push('/')
            }
          })
          .catch((error) => {
            console.log(error)
          })
      }
    }
  },
}
</script>
<style scoped>
.v-slider__track-container {
  height: 10px;
}
.v-slider__track {
  height: 10px;
}
.login-button {
  /* position: absolute; */
  /* bottom: 20px; */
  /* left: 0%;
  right: 0%; */
  text-align: center;
  /* margin: 0px 20px; */
}
.title-filter {
  font-family: Poppins;
  font-weight: 600;
  font-size: 20px;
}
.close-modal {
  font-family: Poppins;
  font-weight: 500;
  color: #424242;
  cursor: pointer;
  padding-right: 30px;
}
.form-icon {
  width: 24px;
  height: 24px;
  cursor: pointer;
}
h3 {
  font-family: Poppins;
  font-weight: 600;
  padding: 20px;
}
.top-section {
  background-image: linear-gradient(to bottom right, #0d47a1, #2962ff);
  height: 250px;
  padding: 25px 20px;
}
.btnBack {
  padding: 10px;
  background: #eeeeee33;
  width: 32px;
  height: 32px;
  border-radius: 10px;
  justify-content: center;
  margin-bottom: 30px;
}
.avatar {
  background: #f17400;
  border: 3px solid white;
  border-radius: 50%;
  height: 80px;
  justify-content: center;
  padding: 20px;
  font-family: Poppins;
  font-weight: 400;
  font-size: 24px;
  color: white;
  margin-left: 15px;
}
.profile {
  background: white;
  height: 100vh;
}
.profile-name {
  font-family: Poppins;
  color: white;
  margin-right: 20px;
}
.profile-name span {
  font-weight: 600;
}
.profile-name >>> .v-chip {
  font-size: 12px;
  color: white;
  text-transform: uppercase;
  margin-bottom: 10px;
}
.name {
  font-size: 20px;
}
.point {
  font-size: 14px;
  line-height: 18px;
}
.hr-divider {
  margin: 20px 20px;
  height: 2px;
  border: 0;
  background: #e3e3e3;
}
span, p {
  font-family: Poppins !important;
  text-transform: capitalize;
}
.info-pribadi,
.version {
  font-family: Poppins !important;
  margin-left: 20px;
  margin-bottom: 10px;
  margin-top: 10px;
  color: #424242;
  font-size: 14px;
  cursor: pointer;
}
.logout {
  font-family: Poppins;
  margin-left: 20px;
  margin-bottom: 10px;
  margin-top: 10px;
  color: #ef3232;
  font-size: 14px;
  cursor: pointer;
}
.btn-detail {
  transform: rotate(180deg);
  padding-left: 25px;
}
.text-right {
  text-align: right !important;
  color: #9e9e9e;
}
.progress {
  margin: 0 auto;
  margin-left: -3%;
  width: 100%;
}

.progress {
  padding: 2px;
  /* background: rgba(0, 0, 0, 0.25); */
  background: white;
  border-radius: 15px;
}

.progress-bar {
  /* width: 50%; */
  height: 12px;
  border-radius: 10px;
  /* background-image: -webkit-linear-gradient(top, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.05));
  background-image: -moz-linear-gradient(top, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.05));
  background-image: -o-linear-gradient(top, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.05));
  background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.05)); */
  background-color: #f9d745;
  -webkit-transition: 0.4s linear;
  -moz-transition: 0.4s linear;
  -o-transition: 0.4s linear;
  transition: 0.4s linear;
  -webkit-transition-property: width, background-color;
  -moz-transition-property: width, background-color;
  -o-transition-property: width, background-color;
  transition-property: width, background-color;
}
.align-center {
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
}
@media (max-width: 375px) {
  .avatar {
    height: 60px;
    margin: auto;
    padding: 10px 10px;
  }
}
.modalShare {
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
  right: 0;
  max-width: 480px;
  max-height: 700px;
  overflow: scroll;
  margin: auto;
  border-radius: 16px 16px 0px 0px;
}
.hr-divider {
  margin: 10px 0;
  height: 1px;
  border: 0;
  background: #e3e3e3;
}
</style>
