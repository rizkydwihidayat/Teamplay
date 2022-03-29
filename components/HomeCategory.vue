<template>
  <div class="container-category">
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
    <div v-for="(item, idx) in listAllMatch" :key="idx" class="card-list">
      <!-- {{ listAllMatch }} -->
    <v-card outlined>
      <h3>{{item.gamename}}</h3>
      <div class="chips">
        <v-chip color="blue" outlined small>
          <span class="txt-chips">{{item.category}}</span>
        </v-chip>
        <v-chip color="blue" outlined small>
          <span class="txt-chips">{{item.gender}}</span>
        </v-chip>
      </div>
      <div class="pl-20 center">
        <img src="~/assets/img/Vector.png" width="16" />
        <span class="txt-list">{{item.place}}</span>
      </div>
      <div class="pl-16 center">
        <img src="~/assets/img/calendar-2.png" width="18" />
        <span class="txt-list">{{item.date}}</span>
      </div>
      <div class="pl-20">
        <span class="fs-12">Pemain</span><span class="txt-list">(16/20)</span>
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
    <!-- end of card list -->

    <!-- bottom button -->
    <div class="bottom-button">
      <v-btn depressed color="primary">
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
    }),
  },
  async mounted() {
    await this.getMatch()
  },
  methods: {
    async getMatch(store = this.$store) {
      const listData = await store.dispatch('match/getListMatch')
      await store.dispatch('match/setListMatch', listData)
    },
  },
}
</script>
<style scoped>
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
  padding-top: 20px;
  padding-bottom: 20px;
  background: white;
}
.card-list {
  margin: 20px;
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
  margin-bottom: 60px;
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
</style>
