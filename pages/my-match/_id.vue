<template>
  <div id="pageMatchDetail" class="compWrapper g-transition page">
    <!-- section header -->
    <div class="container-header pb-4 pt-4 mb-1">
      <v-row class="container-topbar ml-3 mr-3 mt-6 mb-10">
        <v-btn icon :ripple="false" class="btnBack" @click="back">
          <img
            width="32"
            height="32"
            src="~/assets/svg/ic-back-white.svg"
            alt="back"
          />
        </v-btn>
        <v-btn icon :ripple="false" class="btnBack">
          <img
            width="24"
            height="24"
            src="~/assets/svg/ic-share-white.svg"
            alt="share"
          />
        </v-btn>
      </v-row>
      <h2 class="match-title ml-4 mr-4">Disini Saya Senang</h2>
      <v-row class="match-location mr-4 ml-4 mb-4 mt-2">
        <div class="icon-wrapper mr-2">
          <img
            width="20"
            height="20"
            src="~/assets/svg/ic-location-white.svg"
            alt="location"
          />
        </div>
        <p>Dimana2</p>
      </v-row>
    </div>

    <!-- section detail match -->
    <div class="section-detail-match ma-4 pb-2">
      <v-row class="waktu-main mt-0 ml-0 mr-0 mb-4">
        <div class="icon-wrapper mr-3">
          <img
            width="20"
            height="20"
            src="~/assets/svg/ic-calendar-blue.svg"
            alt="match date"
          />
        </div>
        <div class="description-wrapper">
          <p class="desc-subdued mb-1">Waktu Main</p>
          <p class="desc-primary mb-1">Sabtu, 1 Januari 2022</p>
          <p class="desc-primary mb-0">
            18.00 - 20.00 <span class="desc-subdued">(2 jam)</span>
          </p>
        </div>
      </v-row>
      <v-row class="biaya ma-0 mt-0 ml-0 mr-0 mb-4 pt-2 pb-2">
        <div class="icon-wrapper mr-3">
          <img
            width="20"
            height="20"
            src="~/assets/svg/ic-calendar-blue.svg"
            alt="match date"
          />
        </div>
        <div class="description-wrapper">
          <p class="desc-subdued mb-1">Biaya</p>
          <p class="desc-primary mb-0">
            <span class="desc-bold">Rp30.000</span> / pemain
          </p>
        </div>
      </v-row>
      <v-btn block depressed rounded class="btn-primary">Undang Teman</v-btn>
    </div>

    <!-- section location -->
    <div class="divider"></div>
    <div class="section-location ma-4">
      <v-row class="section-title ml-0 mr-0 mt-0 mb-2">
        <h3>Lokasi Lapangan</h3>
      </v-row>
      <p class="desc-primary small">
        Graha Elnusa Lantai 16, Jl. TB Simatupang Kav. 1 B, RT.10/RW.3
      </p>
      <!-- maps -->
      <div
        class="mb-6"
        style="height: 164px; width: 100%; border-radius: 8px; background: grey"
      ></div>
      <v-btn block depressed rounded class="btn-secondary mb-6"
        >Lihat petunjuk jalan</v-btn
      >
    </div>

    <!-- section pemain -->
    <div class="divider"></div>
    <div class="section-pemain">
      <v-row class="section-title ma-4">
        <h3>Pemain</h3>
        <p class="desc-blue mb-0">Lihat semua</p>
      </v-row>
      <div class="player-mini-list description-wrapper ma-4 pb-2">
        <p class="desc-subdued mb-4">Rata-rata usia 25 tahun</p>
        <v-row class="ma-0">
          <div class="player-ava mr-1"><span>AM</span></div>
          <div class="player-ava mr-1"><span>AM</span></div>
          <div class="player-ava mr-1"><span>AM</span></div>
          <div class="player-ava mr-1"><span>AM</span></div>
          <div class="player-number">
            <p class="desc-subdued count mb-0">(17/20)</p>
            <p class="desc-subdued left mb-0">3 pemain lagi</p>
          </div>
        </v-row>
      </div>
    </div>

    <!-- section host -->
    <div class="divider"></div>
    <div class="section-host ma-4 pb-10">
      <p class="desc-primary">Diselenggarakan oleh</p>
      <v-row class="detail-host ma-0">
        <div class="player-ava mr-3"><span>AM</span></div>
        <div class="description-wrapper">
          <v-row style="align-item: center" class="ma-0">
            <p class="desc-bold mb-0 mr-2" style="align-item: center">
              Faishal Arif
            </p>
            <img
              width="20"
              height="20"
              class="mt"
              src="~/assets/svg/ic-circle-check.svg"
              alt="trusted member"
            />
          </v-row>
          <p class="desc-subdued mb-3">Bergabung Juni 2022</p>
          <p class="desc-blue pb-4">Hubungi Host</p>
        </div>
      </v-row>
    </div>

    <!-- CTA -->
    <div class="btn-join-match pa-4">
      <v-btn block depressed rounded class="btn-primary">Join Match</v-btn>
    </div>
  </div>
</template>
<script>
export default {
  name: 'HistoryMatchDetailPage',
  //   components: {
  //     HomeSearch: () =>
  //       import('../components/HomeSearch.vue' /* webpackChunkName: "HomeSellerInfo" */),
  //     HomeCategory: () =>
  //       import('../components/HomeCategory.vue' /* webpackChunkName: "HomeSellerInfo" */),
  //   },
  //   layout: 'bottom_nav',
  head() {
    return {
      title: 'History Match Detail',
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'history_match_detail_default',
          name: 'description',
          content: 'History Match Detail',
        },
        {
          hid: 'history_match_detail_default_keywords',
          name: 'keywords',
          content: 'history, match, match-detail',
        },
      ],
    }
  },
  mounted() {
    console.warn(this.$route)
  },
  methods: {
    back() {
      this.$store.$router.push('/')
    },
  },
}
</script>
<style scoped>
.container-header {
  background-image: url('~@/assets/img/futsal-bg.png');
  background-size: cover;
}
.container-topbar {
  justify-content: space-between;
}
.btnBack {
  background: rgba(255, 255, 255, 0.4);
}
h2.match-title {
  font-size: 24px;
  font-weight: 600;
  font-family: Poppins;
  text-align: left;
  color: white;
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
.desc-primary.small {
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
</style>
