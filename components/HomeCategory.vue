<template>
  <div class="pagecategory">
    <div class="mb-10">
      <h2>Kategori Olahraga</h2>
      <v-layout row wrap class="ic-category">
        <v-flex xs2 class="category"
          ><img src="~/assets/img/soccer-ball(1).png" width="24"
        /></v-flex>
        <v-flex xs2 class="category"
          ><img src="~/assets/img/basket-ball.png" width="24"
        /></v-flex>
        <v-flex xs2 class="category"
          ><img src="~/assets/img/soccer-ball.png" width="24"
        /></v-flex>
        <v-flex xs2 class="category"
          ><img src="~/assets/img/soccer-ball.png" width="24"
        /></v-flex>
      </v-layout>
      <v-layout row wrap class="ic-category">
        <v-flex xs2 class="txt-category"><span>Futsal</span></v-flex>
        <v-flex xs2 class="txt-category"><span>Basket</span></v-flex>
        <v-flex xs2 class="txt-category"><span>Mini Soccer</span></v-flex>
        <v-flex xs2 class="txt-category"><span>Sepak Bola</span></v-flex>
      </v-layout>
    </div>
    <!-- end of category -->

    <!-- card list -->
    <div v-if="isLoading" class="align-center">
      <v-progress-circular
        color="#0d47a1"
        :indeterminate="isLoading"
        :size="35"
        :width="2"
      ></v-progress-circular>
    </div>
    <div v-else>
      <div v-if="listAllMatch.length > 0">
        <div v-for="(item, idx) in listAllMatch" :key="idx" class="card-list">
          <v-card outlined @click="goToDetailMatch(item.id)">
            <h3>{{ item.gamename }}</h3>
            <div class="chips">
              <v-chip color="blue" outlined small>
                <span class="txt-chips">{{ item.category }}</span>
              </v-chip>
              <v-chip color="blue" outlined small>
                <span class="txt-chips">{{ item.gender }}</span>
              </v-chip>
            </div>
            <div class="pl-20 center">
              <img src="~/assets/img/Vector.png" width="16" />
              <span class="txt-list">{{ item.place }}</span>
            </div>
            <div class="pl-16 center">
              <img src="~/assets/img/calendar-2.png" width="18" />
              <span class="txt-list">{{ item.date }}</span>
            </div>
            <div class="pl-20">
              <span class="fs-12">Pemain</span
              ><span class="txt-list">(16/20)</span>
              <p>
                <v-avatar color="indigo" size="20">
                  <span class="white--text fs-10">P1</span>
                </v-avatar>
                <v-avatar color="orange" size="20">
                  <span class="white--text fs-10">P2</span>
                </v-avatar>
                <v-avatar color="blue" size="20">
                  <span class="white--text fs-10">P3</span>
                </v-avatar>
                <v-avatar color="green" size="20">
                  <span class="white--text fs-10">+13</span>
                </v-avatar>
                <span class="fs-12 red-text">4 orang lagi</span>
              </p>
            </div>
          </v-card>
        </div>
      </div>
      <div v-else class="emptyState">
        <span>Saat ini Anda tidak memiliki jadwal pertandingan.</span>
      </div>
    </div>
    <!-- end of card list -->

    <!-- bottom button -->
    <div v-if="listAllMatch.length > 0" class="bottom-button">
      <v-btn depressed color="primary" @click="goToSearch">
        <span> Lihat Pertandingan Lainnya</span>
      </v-btn>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      listMatch: [],
    }
  },
  computed: {
    ...mapState({
      listAllMatch: (state) => state.match.listMatch,
      isLoading: (state) => state.match.isLoading,
    }),
  },
  async mounted() {
    await this.getMatch()
  },
  methods: {
    async getMatch(store = this.$store) {
      // const city = 'bogor'
      // const startDate = '2022-01-01'
      // const endDate = '2022-05-20'
      // const time = '1-2'
      const listData = await store.dispatch('match/getListMatch')
      // {
      //   city,
      //   startDate,
      //   endDate,
      //   time,
      // })
        await store.dispatch('match/setListMatch', listData)
    },
    goToSearch() {
      this.$store.$router.push('/search')
    },
    goToDetailMatch(id) {
      this.$router.push(`/match/${id}`)
    }
  },
}
</script>
<style scoped>
.pagecategory {
  height: 100vh;
  background: white;
}
.emptyState {
  padding: 20px;
  height: auto;
  margin-top: 150px;
  margin-bottom: 20px;
  text-align: center;
  color: #939393;
  font-size: 14px;
}
h2 {
  font-weight: 600;
  margin-bottom: 15px;
  padding-left: 20px;
  font-size: 20px;
  color: #0d47a1;
  font-family: Poppins;
}
h3 {
  font-weight: 600;
  padding-left: 20px;
  padding-top: 12px;
  font-family: Poppins;
}
span {
  font-family: Poppins;
}
.ic-category {
  padding-left: 20px;
}
.category {
  background: #d4e0ff;
  margin: 10px;
  padding: 10px;
  border-radius: 10px;
  text-align: center;
}
.txt-category {
  text-align: center;
  font-size: 12px;
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 10px;
  font-weight: 500;
  font-family: Poppins;
}
.container-category {
  /* padding-top: 20px;
  padding-bottom: 20px; */
  background: white;
}
.card-list {
  margin: 20px;
  cursor: pointer;
}
.txt-chips {
  font-family: Poppins;
  font-weight: 500;
}
.chips {
  padding-top: 5px;
  padding-left: 20px;
  padding-bottom: 12px;
  margin-bottom: 10px;
}
.pl-20 {
  padding-left: 20px;
}
.pl-16 {
  padding-left: 18px !important;
}
.txt-list {
  font-size: 12px;
  color: #757575;
  margin-left: 10px;
}
.center {
  display: flex;
  justify-content: left;
  align-items: center;
  margin-bottom: 5px;
}
.fs-12 {
  font-size: 12px;
}
.fs-10 {
  font-size: 10px;
  font-weight: 600;
}
.red-text {
  color: #f16060;
  margin-left: 10px;
}
.bottom-button {
  padding-left: 20px;
  padding-right: 20px;
}
.bottom-button >>> span {
  text-transform: capitalize !important;
  font-family: Poppins;
  font-weight: 600;
  font-size: 16px;
}
.v-btn {
  width: 100% !important;
}
.align-center {
  text-align: center;
  margin-bottom: 20px;
}
</style>
<style>
.main {
  background: lightgray !important;
  padding: 0px 0px !important;
}
</style>