<template>
  <div class="g-transition search">
    <div class="headBar">
      <div class="container">
        <div class="filter-search">
          <div class="top-filter">
            <v-btn icon :ripple="false" class="btnBack" @click="back">
              <img
                width="32"
                height="32"
                src="~/assets/svg/ic-back-cevron.svg"
                alt="<"
              />
            </v-btn>
            <span>Bekasi</span>
            <small>10 Feb - 17 Feb 2022</small>
          </div>
          <v-chip-group v-model="filter" active-class="primary--text" mandatory>
            <div class="filter">
              <v-chip>Filter</v-chip>
            </div>
            <v-chip>Semua</v-chip>
            <v-chip>Mini Soccer</v-chip>
            <v-chip>Futsal</v-chip>
            <v-chip>Basket</v-chip>
            <v-chip>Sepak Bola</v-chip>
          </v-chip-group>
        </div>
        <div class="list">
          <v-card class="list-card" height="200" max-width="440" outlined>
            <v-list-item three-line>
              <v-layout row wrap>
                <v-flex xs8 class="card-section-1"
                  ><h3>Fun Futsal Bekasi</h3>
                  <v-chip color="blue" outlined small>Futsal </v-chip>
                  <v-chip color="blue" outlined small>Wanita </v-chip>
                  <br /><br />
                  <div class="center">
                    <img src="~/assets/img/Vector.png" width="16" />
                    <span class="txt-list"
                      >Nayla Futsal, Kota Jakarta Barat</span
                    >
                  </div>
                  <div class="center">
                    <img src="~/assets/img/calendar-2.png" width="18" />
                    <span class="txt-list">Sabtu, 19 Februari 2022</span>
                  </div>
                  <br />
                  <v-layout row wrap>
                    <v-flex xs6 class="pl-20"
                      ><span class="fs-12 txt-black">Pemain</span
                      ><span class="txt-list">(16/20)</span></v-flex
                    >
                    <v-flex xs6
                      ><p>
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
                      </p></v-flex
                    >
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-list-item>
          </v-card>
          <v-card class="list-card" height="200" max-width="440" outlined>
            <v-list-item three-line>
              <v-layout row wrap>
                <v-flex xs8 class="card-section-1"
                  ><h3>Fun Futsal Bekasi</h3>
                  <v-chip color="blue" outlined small>Futsal </v-chip>
                  <v-chip color="blue" outlined small>Pria </v-chip>
                  <br /><br />
                  <div class="center">
                    <img src="~/assets/img/Vector.png" width="16" />
                    <span class="txt-list"
                      >Nayla Futsal, Kota Jakarta Barat</span
                    >
                  </div>
                  <div class="center">
                    <img src="~/assets/img/calendar-2.png" width="18" />
                    <span class="txt-list">Sabtu, 19 Februari 2022</span>
                  </div>
                  <br />
                  <v-layout row wrap>
                    <v-flex xs6 class="pl-20"
                      ><span class="fs-12 txt-black">Pemain</span
                      ><span class="txt-list">(16/20)</span></v-flex
                    >
                    <v-flex xs6
                      ><p>
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
                      </p></v-flex
                    >
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-list-item>
          </v-card>
          <v-card class="list-card" height="200" max-width="440" outlined>
            <v-list-item three-line>
              <v-layout row wrap>
                <v-flex xs8 class="card-section-1"
                  ><h3>Fun Futsal Bekasi</h3>
                  <v-chip color="blue" outlined small>Futsal </v-chip>
                  <v-chip color="blue" outlined small>Pria </v-chip>
                  <br /><br />
                  <div class="center">
                    <img src="~/assets/img/Vector.png" width="16" />
                    <span class="txt-list"
                      >Nayla Futsal, Kota Jakarta Barat</span
                    >
                  </div>
                  <div class="center">
                    <img src="~/assets/img/calendar-2.png" width="18" />
                    <span class="txt-list">Sabtu, 19 Februari 2022</span>
                  </div>
                  <br />
                  <v-layout row wrap>
                    <v-flex xs6 class="pl-20"
                      ><span class="fs-12 txt-black">Pemain</span
                      ><span class="txt-list">(16/20)</span></v-flex
                    >
                    <v-flex xs6
                      ><p>
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
                      </p></v-flex
                    >
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-list-item>
          </v-card>
          <v-card class="list-card" height="200" max-width="440" outlined>
            <v-list-item three-line>
              <v-layout row wrap>
                <v-flex xs8 class="card-section-1"
                  ><h3>Fun Futsal Bekasi</h3>
                  <v-chip color="blue" outlined small>Futsal </v-chip>
                  <v-chip color="blue" outlined small>Pria </v-chip>
                  <br /><br />
                  <div class="center">
                    <img src="~/assets/img/Vector.png" width="16" />
                    <span class="txt-list"
                      >Nayla Futsal, Kota Jakarta Barat</span
                    >
                  </div>
                  <div class="center">
                    <img src="~/assets/img/calendar-2.png" width="18" />
                    <span class="txt-list">Sabtu, 19 Februari 2022</span>
                  </div>
                  <br />
                  <v-layout row wrap>
                    <v-flex xs6 class="pl-20"
                      ><span class="fs-12 txt-black">Pemain</span
                      ><span class="txt-list">(16/20)</span></v-flex
                    >
                    <v-flex xs6
                      ><p>
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
                      </p></v-flex
                    >
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-list-item>
          </v-card>
          <v-card class="list-card" height="200" max-width="440" outlined>
            <v-list-item three-line>
              <v-layout row wrap>
                <v-flex xs8 class="card-section-1"
                  ><h3>Fun Futsal Bekasi</h3>
                  <v-chip color="blue" outlined small>Futsal </v-chip>
                  <v-chip color="blue" outlined small>Pria </v-chip>
                  <br /><br />
                  <div class="center">
                    <img src="~/assets/img/Vector.png" width="16" />
                    <span class="txt-list"
                      >Nayla Futsal, Kota Jakarta Barat</span
                    >
                  </div>
                  <div class="center">
                    <img src="~/assets/img/calendar-2.png" width="18" />
                    <span class="txt-list">Sabtu, 19 Februari 2022</span>
                  </div>
                  <br />
                  <v-layout row wrap>
                    <v-flex xs6 class="pl-20"
                      ><span class="fs-12 txt-black">Pemain</span
                      ><span class="txt-list">(16/20)</span></v-flex
                    >
                    <v-flex xs6
                      ><p>
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
                      </p></v-flex
                    >
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-list-item>
          </v-card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SearchPage',
  methods: {
    back() {
      this.$store.$router.push('/')
    }
  },
}
</script>
<style scoped>
.search {
  padding-top: 20px;
  padding-bottom: 20px;
  background: white;
  height: 100%;
}
.filter-search {
  padding: 20px;
  box-shadow: 0 -0.1px 6px 0 rgba(0, 0, 0, 0.08);
  top: 0px;
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
.filter {
  border-right: solid 1px lightgray;
  margin-right: 10px;
}
.top-filter {
  margin-bottom: 20px;
}
.list {
  margin-top: 130px;
  margin-bottom: 20px;
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
.list-card {
  margin: 20px;
  width: 91%;
  font-family: Poppins;
  padding: 15px 10px 10px 15px;
  border-radius: 15px;
}
.list-card span {
  font-family: Poppins;
  color: white;
}
.card-section-1 {
  padding: 15px 0px 0px 0px;
}
.card-section-2 {
  padding: 15px 0px 0px 0px;
  text-align: right;
}
</style>
<style>
.main {
  background: lightgray !important;
  padding: 0px 0px !important;
}
</style>
