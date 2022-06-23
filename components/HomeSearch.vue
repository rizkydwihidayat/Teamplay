<template>
  <div class="container-top">
    <div class="top-element">
      <h2 class="welcome mt-5">Halo, {{ nameUser }}!</h2>
      <p>
        Selamat datang di Teamplay! <br />
        Anti ribet atur janji buat olahraga bareng.
      </p>
      <br />
      <v-text-field
        v-if="!hideSearch"
        v-model="fieldCity"
        solo
        append-icon="mdi-magnify"
        placeholder="Mau maen dimana?"
        class="search"
        @change="searchByCity"
      ></v-text-field>
      <v-card v-if="matchPIC" outlined class="match-card">
        <v-layout row wrap>
          <v-flex xs6 s6 class="pl-16 p-12-20">
            <h3>gamename</h3>
          </v-flex>
          <v-flex xs6 s6 class="align-right label">
            <v-chip small color="rgba(239, 50, 50, 1)" class="capsule mr-2"
              >Play today!</v-chip
            >
          </v-flex>
        </v-layout>
        <div class="pl-20 center">
          <v-layout row wrap class="pl-16">
            <v-flex xs6 s6 class="tgl">
              <img src="~/assets/img/Vector.png" width="16" />
              <span class="txt-list">lokasi</span>
            </v-flex>
            <v-flex xs6 s6 class="btn-detail"> </v-flex>
          </v-layout>
        </div>
        <div class="pl-16 center">
          <v-layout row wrap class="pl-16">
            <v-flex xs6 s6 class="tgl">
              <img src="~/assets/img/calendar-2.png" width="18" />
              <span class="txt-list">tanggal</span>
            </v-flex>
            <v-flex xs6 s6 class="btn-detail"> </v-flex>
          </v-layout>
        </div>
        <div class="pl-20">
          <v-btn
            class="create-btn"
            depressed
            color="primary"
            :disabled="!valid"
            @click="submitCreateMatch"
          >
            <span> Absen Pemain</span>
          </v-btn>
          <v-btn
            class="create-btn"
            depressed
            color="primary"
            :disabled="!valid"
            @click="submitCreateMatch"
          >
            <span> Selesaikan Pertandingan</span>
          </v-btn>
        </div>
      </v-card>
      <v-card v-if="matchUser" outlined>
        <v-layout row wrap>
          <v-flex xs6 s6 class="pl-16 p-12-20">
            <h3>gamename</h3>
          </v-flex>
          <v-flex xs6 s6 class="align-right label">
            <v-chip small color="rgba(239, 50, 50, 1)" class="capsule mr-2"
              >Play now!</v-chip
            >
          </v-flex>
        </v-layout>
        <div class="pl-20 center">
          <v-layout row wrap class="pl-16">
            <v-flex xs6 s6 class="tgl">
              <img src="~/assets/img/Vector.png" width="16" />
              <span class="txt-list">lokasi</span>
            </v-flex>
            <v-flex xs6 s6 class="btn-detail"> </v-flex>
          </v-layout>
        </div>
        <div class="pl-16 center">
          <v-layout row wrap class="pl-16">
            <v-flex xs6 s6 class="tgl">
              <img src="~/assets/img/calendar-2.png" width="18" />
              <span class="txt-list">tanggal</span>
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
        </div>
      </v-card>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'TopHome',
  data() {
    return {
      fieldCity: '',
      nameUser: '',
      matchPIC: false,
      matchUser: false,
      hideSearch: false,
    }
  },
  computed: {
    ...mapState({
      // namaUser: (state) => state.user.nameGoogleAcc,
      filterCity: (state) => state.match.filterCity,
    }),
  },
  mounted() {
    this.nameUser = localStorage.getItem('nameGoogleAcc')
    const verified = localStorage.getItem('isVerified')
    if (verified === 'true') {
      this.matchPIC = true
      this.hideSearch = true
    } else {
      this.matchUser = true
      this.hideSearch = true
    }
  },
  methods: {
    ...mapMutations({
      setState: 'match/setState',
    }),
    searchByCity() {
      this.setState({ filterCity: this.fieldCity })
      this.$store.$router.push('/search')
    },
  },
}
</script>
<style scoped>
h2.welcome {
  font-size: 24px;
  font-weight: 700;
  font-family: Poppins;
  text-align: left;
  color: white;
}
h3 {
  font-weight: 600;
  padding-left: 16px;
  padding-top: 12px;
  padding-bottom: 16px;
  font-family: Poppins;
}
.label {
  padding-top: 25px;
  padding-right: 25px;
}
.txt-list {
  padding-left: 5px;
  padding-bottom: 10px;
}
.v-card {
  border: 1px solid #2962ff !important;
  border-radius: 8px;
  box-shadow: 0px 2px 8px rgba(43, 103, 246, 0.25);
}
.btn-detail {
  transform: rotate(180deg);
  padding-left: 25px;
}
.info-pribadi {
  font-family: Poppins !important;
  margin-left: 20px;
  margin-bottom: 10px;
  margin-top: 10px;
  color: #424242;
  font-size: 14px;
  cursor: pointer;
}
.tgl {
  padding: 3px 0px 0px 0px;
}
p {
  font-weight: 300;
  font-size: 14px;
  color: white;
  font-family: Poppins;
}
.top-element {
  padding-left: 20px;
  padding-right: 20px;
}
.v-input__slot {
  background: white !important;
}
.container-top {
  padding-top: 20px;
  padding-bottom: 20px;
  /* background: #0D47A1; */
  background: white;
  background-image: url('~@/assets/img/Home.png');
  background-position: bottom;
}
.search >>> .v-text-field__slot input {
  color: #9e9e9e;
  font-family: Poppins;
}
.pl-20 {
  padding-left: 20px;
}
.ml-20 {
  margin-left: 20px;
}
.pl-16 {
  padding-left: 18px !important;
  padding-bottom: 16px;
}
.capsule {
  font-size: 12px;
  font-weight: 400;
  font-family: Poppins;
  /* text-transform: capitalize !important; */
  color: white;
}
</style>
