<template>
  <div id="pageJoinSuccess" class="compWrapper g-transition page">
    <!-- section header -->
    <!-- <div class="container-header">
        </div> -->
    <div class="top">
      <div class="ic-1">
        <div class="ic-2">
          <div class="ic-3"></div>
        </div>
      </div>
    </div>

    <!-- section detail match -->
    <div class="section-content ma-4">
      <p class="success-text desc-primary mb-0">Kamu berhasil bergabung!</p>
      <p class="success-text desc-primary">
        Ditunggu kehadiran kamu di lapangan ya!
      </p>
      <div>
        <v-alert
          outlined
          text
          type="warning"
          icon="mdi-alert-circle"
          class="alert"
        >
          <span class="notif"
            >Buka Teamplay di H-1 untuk cek<br />pertandingan jadi
            dilaksanakan</span
          >
        </v-alert>
      </div>

      <!-- card match -->
      <v-card outlined class="pa-3 mb-6">
        <h3 class="match-title">{{ matchdetail.gameName }}</h3>
        <v-row class="waktu-main ma-0 pt-3">
          <!-- <v-col class="col-1 pa-0">
            <div class="icon-wrapper mr-3">
              <img
                width="20"
                height="20"
                src="~/assets/svg/ic-calendar-blue.svg"
                alt="match date"
              />
            </div>
          </v-col> -->
          <v-col class="pa-0">
            <div class="description-wrapper pl-3">
              <p class="desc-primary small mb-1">
                <img src="~/assets/img/calendar-2.png" width="18" />
                {{ matchdetail.playDate }}
              </p>
              <p class="desc-primary small mb-0">
                {{ matchdetail.time }} <span class="desc-subdued">(2 jam)</span>
              </p>
            </div>
          </v-col>
        </v-row>
        <v-row class="lokasi ma-0 pt-3">
          <!-- <v-col class="col-1 pa-0">
            <div class="icon-wrapper mr-3">
              <img
                width="20"
                height="20"
                src="~/assets/svg/ic-location-blue.svg"
                alt="match location"
              />
            </div>
          </v-col> -->
          <v-col class="pa-0">
            <div class="description-wrapper pl-3">
              <p class="desc-primary small mb-1">
                <img src="~/assets/img/Vector.png" width="16" />
                {{ matchdetail.venueName }}
              </p>
              <p class="desc-subdued small mb-0">
                {{ matchdetail.address }}
              </p>
            </div>
          </v-col>
        </v-row>
      </v-card>

      <v-btn
        block
        depressed
        rounded
        class="btn-primary mb-3"
        @click="inviteFriend"
        >Undang Teman</v-btn
      >
      <v-btn block rounded text class="btn-naked" @click="goToHome"
        >Kembali ke Home</v-btn
      >
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'SuccessPage',
  computed: {
    ...mapState({
      matchdetail: (state) => state.match.matchdetail,
    }),
  },
  async mounted() {
    await this.getMatchDetail()
  },
  methods: {
    async getMatchDetail(store = this.$store) {
      //   this.matchDetail = []
      const id = this.$route.params.id
      const match = await store.dispatch('match/getMatchId', { id })
      await store.dispatch('match/setMatchDetail', match)
      //   return this.matchDetail.push(match)
    },
    goToHome() {
      this.$router.push('/')
    },
    inviteFriend() {
      const usrId = localStorage.getItem('userID')
      const id = this.$route.params.id
      const url = new URL(window.location.origin) + `match/${id}` + `?invitedFrom=${usrId}`
      // url.select()
      const copied = navigator.clipboard.writeText(url)
      try {
        // const copied = document.execCommand('copy')
        const alertMsg = {
          msg: copied
            ? 'Link pertandingan berhasil dicopy'
            : 'Gagal copy Link pertandingan',
          color: '#43A047',
        }
        this.$store.dispatch('ui/showAlert', alertMsg, { root: true })
      } catch (err) {
        const alertMsg = {
          msg: 'Oops, unable to copy',
          color: 'secondary',
        }
        this.$store.dispatch('ui/showAlert', alertMsg, { root: true })
      }
    },
  },
}
</script>
<style scoped>
.container-header {
  background-image: url('~@/assets/svg/success.svg');
  background-size: cover;
  display: inline-block;
  height: 0;
  padding-bottom: 58%;
  width: 100%;
}
.success-text {
  text-align: center;
}
.callout-warning {
  background: rgba(253, 248, 229, 1);
  border: rgba(239, 186, 0, 1) solid 1px;
  border-radius: 4px;
}
/*  */
.btnBack {
  background: rgba(255, 255, 255, 0.4);
}
h3.match-title {
  font-size: 20px;
  font-weight: 600;
  font-family: Poppins;
  text-align: left;
  color: rgba(66, 66, 66, 1);
}
.match-location {
  align-items: center;
}
.icon-wrapper {
  background: rgba(227, 242, 253, 1);
  border-radius: 50%;
  height: 32px;
  width: 32px;
  padding: 6px;
}
.match-location .icon-wrapper {
  background: rgba(255, 255, 255, 0.4);
}
.match-location >>> p {
  font-weight: 300;
  font-size: 16px;
  color: white;
  font-family: Poppins;
  margin-bottom: 0;
}
.match-location >>> p {
  font-weight: 300;
  font-size: 16px;
  color: white;
  font-family: Poppins;
  margin-bottom: 0;
}
.desc-subdued {
  font-weight: 400;
  font-size: 16px;
  color: rgba(189, 189, 189, 1);
  font-family: Poppins;
}
.desc-primary {
  font-weight: 400;
  font-size: 16px;
  color: rgba(66, 66, 66, 1);
  font-family: Poppins;
}
.desc-bold {
  font-weight: 700;
  font-size: 16px;
  color: rgba(66, 66, 66, 1);
  font-family: Poppins;
}
.divider {
  height: 4px;
  background: rgba(227, 242, 253, 1);
}
.section-title {
  align-items: baseline;
  justify-content: space-between;
}
.section-title h3 {
  font-size: 20px;
  font-weight: 600;
  font-family: Poppins;
  text-align: left;
  color: rgba(66, 66, 66, 1);
}
.desc-blue {
  font-weight: 500;
  font-size: 14px;
  color: rgba(41, 121, 255, 1);
  font-family: Poppins;
}
.player-ava {
  height: 40px;
  width: 40px;
  background: rgba(43, 103, 246, 1);
  border-radius: 50%;
  border: solid 1px rgba(0, 0, 0, 1);
  padding: 6px;
}
.player-ava span {
  color: white;
  font-weight: 600;
  font-size: 16px;
  font-family: Poppins;
}
.player-number p {
  font-size: 14px !important;
}
.desc-subdued.left {
  color: rgba(255, 61, 0, 1);
  font-weight: 500;
  font-size: 16px;
  font-family: Poppins;
}
p.small {
  font-size: 14px;
}
.btn-secondary {
  color: rgba(41, 121, 255, 1);
  background-color: rgba(233, 241, 255, 1) !important;
  text-transform: none;
  font-weight: 500;
  font-family: Poppins;
}
.btn-primary {
  background-color: rgba(41, 121, 255, 1) !important;
  color: white;
  text-transform: none;
  font-weight: 500;
  font-family: Poppins;
}
.btn-naked {
  color: rgba(41, 121, 255, 1);
  text-transform: none;
  font-weight: 500;
  font-family: Poppins;
}
.btn-join-match {
  /* padding: 20px; */
  box-shadow: 0 0.1px 6px 0 rgba(0, 0, 0, 0.08);
  /* border-bottom: 1px solid #757575; */
  /* border-top: 1px solid #757575; */
  /* padding: 0 15px; */
  bottom: 0;
  background: #fff;
  z-index: 5;
  clear: both;
  position: fixed;
  width: 100%;
  margin: auto;
  left: 0;
  right: 0;
}
.top {
  height: 325px;
  width: 100%;
  background-image: url('~@/assets/img/bg-success-pg.png');
}
.ic-1 {
  padding-top: 20px !important;
  height: 300px;
  background-position: center;
  background-image: url('~@/assets/svg/ornament.svg');
}
.ic-2 {
  height: 275px;
  background-position: center;
  background-image: url('~@/assets/svg/ellipse.svg');
}
.ic-3 {
  height: 275px;
  background-position: center;
  background-image: url('~@/assets/img/verify.png');
}
.notif {
  color: #424242;
  text-align: justify;
}
.alert {
  justify-items: center;
  margin-left: 40px;
  margin-right: 40px;
}
.pl-20 {
  padding-left: 20px;
}
.pl-16 {
  padding-left: 18px !important;
}
.desc-primary {
  font-weight: 400;
  font-size: 16px;
  color: rgba(66, 66, 66, 1);
  font-family: Poppins;
}
</style>
