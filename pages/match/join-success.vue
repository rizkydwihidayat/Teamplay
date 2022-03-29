<template>
    <div id="pageJoinSuccess" class="compWrapper g-transition">
        
        <!-- section header -->
        <div class="container-header">
        </div>

        <!-- section detail match -->
        <div class="section-content ma-4">
          <p class="success-text desc-primary mb-0">Kamu berhasil bergabung!</p>
          <p class="success-text desc-primary">Ditunggu kehadiran kamu di lapangan ya!</p>
          <div class="callout-warning mb-4">
            <v-row class="ma-0">
              <v-col class="col-1">
                <img
                width="24"
                height="24"
                src="~/assets/svg/ic-error-alert.svg"
                alt="info warning"
              />
              </v-col>
              <v-col>
                <span class="desc-primary mb-0">
                  Buka aplikasi Teamplay di H-1 untuk cek pertandingan jadi dilaksanakan
                </span>
              </v-col>
            </v-row>
          </div>

          <!-- card match -->
          <v-card outlined class="pa-3 mb-6">
            <h3 class="match-title">Fun Futsal Bekasi</h3>
            <v-row class="waktu-main ma-0 pt-3">
                <v-col class="col-1 pa-0">
                  <div class="icon-wrapper mr-3">
                      <img
                          width="20"
                          height="20"
                          src="~/assets/svg/ic-calendar-blue.svg"
                          alt="match date"
                      />
                  </div>
                </v-col>
                <v-col class="pa-0">
                  <div class="description-wrapper pl-3">
                      <p class="desc-primary small mb-1">Sabtu, 1 Januari 2022</p>
                      <p class="desc-primary small mb-0">18.00 - 20.00 <span class="desc-subdued">(2 jam)</span></p>
                  </div>
                </v-col>
            </v-row>
            <v-row class="lokasi ma-0 pt-3">
                <v-col class="col-1 pa-0">
                  <div class="icon-wrapper mr-3">
                      <img
                          width="20"
                          height="20"
                          src="~/assets/svg/ic-location-blue.svg"
                          alt="match location"
                      />
                  </div>
                </v-col>
                <v-col class="pa-0">
                  <div class="description-wrapper pl-3">
                    <p class="desc-primary small mb-1">Nayla Futsal, Jakarta Barat</p>
                    <p class="desc-subdued small mb-0">
                      Graha Elnusa Lantai 16, Jalan TB Simatupang Kav. 1 B, RT.10/RW.3
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
          >Undang Teman</v-btn>
          <v-btn
            block
            rounded
            text
            class="btn-naked"
          >Kembali ke Home</v-btn>
        </div>

    </div>
</template>

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
.btnBack{
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
    background: rgba(227, 242, 253, 1.0);
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
    background: rgba(227, 242, 253, 1.0);
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
</style>

<script>
export default {
  name: "MatchDetailPage",
//   components: {
//     HomeSearch: () =>
//       import('../components/HomeSearch.vue' /* webpackChunkName: "HomeSellerInfo" */),
//     HomeCategory: () =>
//       import('../components/HomeCategory.vue' /* webpackChunkName: "HomeSellerInfo" */),
//   },
//   layout: 'bottom_nav',
  head() {
    return {
      title: 'Match Detail',
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'match_detail_default',
          name: 'description',
          content: 'Match Detail',
        },
        {
          hid: 'match_detail_default_keywords',
          name: 'keywords',
          content: 'match, match-detail',
        },
      ],
    }
  },
}
</script>