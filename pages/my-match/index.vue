<template>
  <!-- <v-main class="main"> -->
  <div>
    <TopBarNav />
    <br />
    <br />
    <div id="pageMatch" class="compWrapper g-transition match page">
      <div class="filter-match">
        <v-chip-group v-model="inputCategory" active-class="primary--text">
          <v-chip v-for="data in filterCategory" :key="data" :value="data">{{
            data
          }}</v-chip>
        </v-chip-group>
      </div>
      <div v-if="listAllMatch.length !== 0" class="card">
        <div v-for="(item, idx) in listAllMatch" :key="idx" class="list-card">
          <v-card outlined @click="goToDetailMatch(item.id)">
            <v-layout row wrap>
              <v-flex xs8 class="card-section-1"
                ><h3>{{ item.gamename }}</h3>
                <br />
                <div class="center">
                  <img src="~/assets/img/Vector.png" width="16" />
                  <span class="txt-list">{{ item.place }}</span>
                </div>
                <div class="center">
                  <img src="~/assets/img/calendar-2.png" width="18" />
                  <span class="txt-list">{{ item.date }}</span>
                </div>
                <br />
                <v-layout row wrap>
                  <v-flex xs6 class="pl-20"
                    ><span class="fs-12 txt-black">Pemain</span
                    ><span class="txt-list"
                      >({{ item.totalPayer }}/{{ minplayer }})</span
                    ></v-flex
                  >
                  <v-flex xs6 class="mb-10"
                    ><p>
                      <v-avatar
                        v-if="item.totalPayer > 0"
                        color="indigo"
                        size="20"
                      >
                        <span class="white--text fs-10">P1</span>
                      </v-avatar>
                      <v-avatar
                        v-if="item.totalPayer > 1 || item.totalPayer === 2"
                        color="orange"
                        size="20"
                      >
                        <span class="white--text fs-10">P2</span>
                      </v-avatar>
                      <v-avatar
                        v-if="item.totalPayer > 2 || item.totalPayer === 3"
                        color="blue"
                        size="20"
                      >
                        <span class="white--text fs-10">P3</span>
                      </v-avatar>
                      <v-avatar
                        v-if="item.totalPayer > 3"
                        color="green"
                        size="20"
                      >
                        <span class="white--text fs-10">+13</span>
                      </v-avatar>
                      <span class="fs-12 red-text"
                        >{{ sisaPlayer }} orang lagi</span
                      >
                    </p></v-flex
                  >
                </v-layout>
              </v-flex>
              <v-flex xs4 class="card-section-2"
                ><v-chip :color="getColor(item.status, item.joined)" small>
                  <span v-if="item.status === 'Open'" class="txt-black">{{
                    item.status
                  }}</span>
                  <span v-else>{{ item.status }}</span>
                </v-chip></v-flex
              >
            </v-layout>
          </v-card>
        </div>
      </div>
      <div v-else class="empty">
        <span v-if="listAllMatch.length === 0" class="emptyState"
          >Riwayat pertandingan tidak ditemukan.</span
        >
      </div>
    </div>
  </div>
  <!-- </v-main> -->
</template>
<script>
import { mapState } from 'vuex'
const components = {
  TopBarNav: () => import('~/components/TopbarWithTitle'),
}
export default {
  name: 'MatchPage',
  components,
  // layout: 'bottom_nav',
  layout: 'bottom_nav_trusted',
  data() {
    return {
      filter: '',
      listMatch: [],
      filterCategory: ['Semua', 'Bergabung', 'Batal', 'Selesai'],
      inputCategory: '',
      minplayer: 0,
      sisaPlayer: 0,
    }
  },
  computed: {
    ...mapState({
      listAllMatch: (state) => state.match.matchToday,
    }),
  },
  async mounted() {
    await this.getMatch()
    await this.checkTotalPlayer()
    await this.checkCurrentPlayer()
  },
  methods: {
    async getMatch(store = this.$store) {
      const bearer = localStorage.getItem('accKey')
      const userID = localStorage.getItem('userID')
      const listData = await store.dispatch('match/getMatchHistory', {
        bearer,
        userID,
      })
      await store.dispatch('match/setMatchToday', listData)
    },
    getColor(status) {
      switch (status) {
        case 'Selesai':
          return 'grey'
        case 'Canceled':
          return 'red'
        default:
          return ''
      }
    },
    goToDetailMatch(id) {
      this.$router.push({ path: `/my-match/${id}` })
    },
    checkCurrentPlayer() {
      this.listAllMatch.forEach((item) => {
        const result = item.totalPayer - this.minplayer
        this.sisaPlayer = result
        return this.sisaPlayer
      })
    },
    checkTotalPlayer() {
      this.listAllMatch.forEach((item) => {
        const category = item.category
        switch (category) {
          case 'Futsal':
            this.minplayer = 15
            break
          case 'Basket':
            this.minplayer = 15
            break
          case 'Mini Soccer':
            this.minplayer = 18
            break
          case 'Sepak Bola':
            this.minplayer = 25
            break
        }
      })
    },
  },
}
</script>
<style scoped>
.card {
  margin-top: 60px;
  margin-bottom: 20px;
  width: 100%;
}
.match {
  padding-top: 60px;
  padding-bottom: 50px;
  background: white;
  /* text-align: center; */
  height: 100vh;
}
.list-card {
  margin: 20px;
  font-family: Poppins;
}
.list-card span {
  font-family: Poppins;
  color: white;
}
.card-section-1 {
  padding: 25px 0px 0px 25px;
}
.card-section-2 {
  padding: 25px 25px 0px 0px;
  text-align: right;
}
.filter-match {
  padding: 20px;
  box-shadow: 0 -0.1px 6px 0 rgba(0, 0, 0, 0.08);
  top: 55px;
  background: #fff;
  z-index: 5;
  clear: both;
  position: fixed;
  width: 100%;
  margin: auto;
  left: 0;
  right: 0;
  max-width: 480px;
  font-family: Poppins;
}
.txt-list {
  color: #757575 !important;
  font-size: 12px;
  line-height: 18px;
  padding-left: 10px;
}
.center {
  display: flex;
  justify-content: left;
  align-items: center;
  margin-bottom: 5px;
  padding-right: 15px;
}
.txt-black {
  color: black !important;
}
.fs-12 {
  font-size: 12px;
}
.fs-10 {
  font-size: 10px;
}
.pl-20 {
  padding-left: 16px;
}
.list {
  margin-top: 100px;
  margin-bottom: 20px;
  height: 100vh;
}
.emptyState {
  text-align: center !important;
  padding: 20px;
  padding-left: auto;
  right: 0px;
  font-family: Poppins;
  color: #939393;
  font-size: 14px;
}
.empty {
  right: 0px;
  height: auto;
  margin-top: 150px;
  margin-bottom: 20px;
}
</style>
