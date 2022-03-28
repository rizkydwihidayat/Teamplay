<template>
  <div class="g-transition profile">
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
            <span>FA</span>
          </v-flex>
          <v-flex xs7 s7 class="profile-name">
            <span class="name">Faisal Arif</span><br />
            <v-chip color="#eeeeee33" small>Member </v-chip>
            <br />
            <span class="point"
              >Poinku
              <img width="12" height="12" src="~/assets/svg/alert.svg" alt="<"
            /></span>
            <div class="progress">
              <div class="progress-bar"></div>
            </div>
            <br />
          </v-flex>
        </v-layout>
      </div>
    </div>
    <div>
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
          <span>No. Handphone</span>
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
          <span>Email</span>
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
        <v-flex xs6 s6>
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
  </div>
</template>
<script>
export default {
  name: 'ProfilePage',
  methods: {
    back() {
      this.$store.$router.push('/')
    },
  },
}
</script>
<style scoped>
h3 {
  font-family: Poppins;
  font-weight: 600;
  padding: 20px;
}
.top-section {
  background-image: linear-gradient(to bottom right, #0d47a1, #2962ff);
  height: 230px;
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
  margin-left: 20px;
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
.info-pribadi,
.version {
  font-family: Poppins;
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
.progress {
  margin: 0 auto;
  margin-left: -3%;
  width: 100%;
}

.progress {
  padding: 4px;
  /* background: rgba(0, 0, 0, 0.25); */
  background: white;
  border-radius: 15px;
}

.progress-bar {
  width: 50%;
  height: 15px;
  border-radius: 10px;
  /* background-image: -webkit-linear-gradient(top, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.05));
  background-image: -moz-linear-gradient(top, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.05));
  background-image: -o-linear-gradient(top, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.05));
  background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.05)); */
  background-color: #F9D745;
  -webkit-transition: 0.4s linear;
  -moz-transition: 0.4s linear;
  -o-transition: 0.4s linear;
  transition: 0.4s linear;
  -webkit-transition-property: width, background-color;
  -moz-transition-property: width, background-color;
  -o-transition-property: width, background-color;
  transition-property: width, background-color;
}
</style>
