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
        v-if="isMatchToday === false"
        v-model="fieldCity"
        solo
        append-icon="mdi-magnify"
        placeholder="Mau maen dimana?"
        class="search"
        @change="searchByCity"
      ></v-text-field>
      <v-card v-if="isMatchToday === true" outlined>
        <v-layout row wrap>
          <v-flex xs6 s6 class="pl-16 p-12-20">
            <h3>{{ matchToday[0].gamename }}</h3>
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
              <span class="txt-list">{{ matchToday[0].place }}</span>
            </v-flex>
            <v-flex xs6 s6 class="btn-detail"> </v-flex>
          </v-layout>
        </div>
        <div class="pl-16 center">
          <v-layout row wrap class="pl-16 cursor-pointer">
            <v-flex xs6 s6 class="tgl">
              <img src="~/assets/img/calendar-2.png" width="18" />
              <span class="txt-list">Hari ini, {{ matchToday[0].time }}</span>
            </v-flex>
            <v-flex
              v-if="!matchPIC"
              xs6
              s6
              class="btn-detail"
              @click="goToMatch(matchToday[0].id)"
              ><img
                width="24"
                height="24"
                src="~/assets/svg/ic-back-cevron.svg"
                alt="<"
              />
            </v-flex>
          </v-layout>
        </div>
        <div class="pl-20 pr-20">
          <v-btn
            v-if="matchPIC"
            block
            depressed
            rounded
            class="btn-primary create-btn"
            @click="goToAbsen(matchToday[0].id)"
          >
            <span> Absen Pemain</span>
          </v-btn>
          <br />
          <v-btn
            v-if="btnEndTime"
            block
            depressed
            rounded
            class="btn-primary create-btn"
            @click="submitCreateMatch"
          >
            <span> Selesaikan Pertandingan</span>
          </v-btn>
        </div>
      </v-card>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import moment from 'moment'
export default {
  name: 'TopHome',
  data() {
    return {
      fieldCity: '',
      nameUser: '',
      matchPIC: false,
      matchUser: false,
      currentDate: new Date().toISOString().substr(0, 10),
      isMatchToday: false,
      btnEndTime: false,
    }
  },
  computed: {
    ...mapState({
      // namaUser: (state) => state.user.nameGoogleAcc,
      filterCity: (state) => state.match.filterCity,
      matchToday: (state) => state.match.matchToday,
    }),
  },
  async mounted() {
    this.nameUser = localStorage.getItem('nameGoogleAcc')
    const verified = localStorage.getItem('isVerified')
    if (verified === 'true') {
      this.matchPIC = true
    } else {
      this.matchUser = true
    }
    await this.getMatchToday()
  },
  methods: {
    ...mapMutations({
      setState: 'match/setState',
    }),
    searchByCity() {
      this.setState({ filterCity: this.fieldCity })
      this.$router.push({ name: 'search'})
    },
    BDTime() {
      moment.locale('id')
      const result = moment().format('dddd' + ', ' + 'll')
      return result
    },
    async getMatchToday(store = this.$store) {
      const bearer = localStorage.getItem('accKey')
      const userID = localStorage.getItem('userID')
      if (userID !== null) {
        const listData = await store.dispatch('match/getMatchHistory', {
          bearer,
          userID,
        })
        // eslint-disable-next-line array-callback-return
        listData.data.filter(async (item) => {
          const date = this.BDTime()
          const currentTime = moment().hour().toString()
          // const matchTime = item.match.match.timePlay.slice(0, 2)
          const matchEnd = item.match.match.timePlay.slice(7, 10)
          if (date === item.match.match.playDate) {
            this.isMatchToday = true
            await store.dispatch('match/setMatchToday', listData)
          } else if (currentTime === matchEnd) {
            this.btnEndTime = true
            this.isMatchToday = false
          } else if (Number(currentTime) > Number(matchEnd)) {
            this.isMatchToday = false
          }
        })
      }
    },
    goToAbsen(id) {
      this.$router.push({ path: `/absen/${id}`})
    },
    goToMatch(id) {
      this.$router.push({ path: `/match/${id}`})
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
