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
              <v-chip @click="openFilter">Filter</v-chip>
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
        </div>
        <v-dialog
          v-model="showdialog"
          transition="dialog-bottom-transition wrap-400"
        >
          <v-card class="modalShare">
            <v-card-title class="headerModal mt-2">
              <v-layout row wrap>
                <v-flex xs1 s1 class="close-modal">
                  <div class="align-right" @click="closeDialog">X</div>
                </v-flex>
                <v-flex xs6 s6>
                  <span class="title-filter">Ubah Pencarian</span>
                </v-flex>
              </v-layout>
            </v-card-title>
            <hr class="hr-divider" />
            <v-card-text>
              <div class="filter-field">
                <v-text-field
                  outlined
                  append-icon="mdi-magnify"
                  placeholder="Mau maen dimana?"
                ></v-text-field>
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  :return-value.sync="date"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template #activator="{ on, attrs }">
                    <v-text-field
                      v-model="date"
                      label="Tanggal main"
                      append-icon="mdi-calendar"
                      outlined
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="date" range no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu = false">
                      Cancel
                    </v-btn>
                    <v-btn text color="primary" @click="$refs.menu.save(date)">
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-menu>
              </div>
              <div class="filter-category">
                <h3>Kategori Pemain</h3>
                <v-chip-group
                  v-model="filterCategory"
                  active-class="primary--text"
                  mandatory
                >
                  <v-chip>Pria</v-chip>
                  <v-chip>Wanita</v-chip>
                  <v-chip>Campuran</v-chip>
                </v-chip-group>
              </div>
              <div class="filter-waktu-main">
                <h3>Waktu Main</h3>
                <v-checkbox
                  v-model="checkbox"
                  label="Pagi (06.00 - 12.00)"
                  hide-details
                ></v-checkbox>
                <v-checkbox
                  v-model="checkbox"
                  label="Siang (12.00 - 15.00)"
                  hide-details
                ></v-checkbox>
                <v-checkbox
                  v-model="checkbox"
                  label="Sore (15.00 - 18.00)"
                  hide-details
                ></v-checkbox>
                <v-checkbox
                  v-model="checkbox"
                  label="Malam (18.00 - 23.00)"
                  hide-details
                ></v-checkbox>
              </div>
            </v-card-text>
            <div class="bottom-button">
              <v-btn depressed rounded color="primary">
                <span> Cari pertandingan</span>
              </v-btn>
            </div>
          </v-card>
        </v-dialog>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SearchPage',
  data() {
    return {
      showdialog: false,
      filterCategory: '',
    }
  },
  methods: {
    back() {
      this.$store.$router.push('/')
    },
    openFilter() {
      this.showdialog = true
    },
    closeDialog() {
      this.showdialog = false
    },
  },
}
</script>
<style scoped>
h3 {
  font-family: Poppins;
  font-weight: 600;
  color: black;
}
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
  width: 100%;
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
.modalShare {
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
  right: 0;
  max-width: 480px;
  max-height: 700px;
  overflow: scroll;
  margin: auto;
  border-radius: 16px 16px 0px 0px;
}
.hr-divider {
  margin: 10px 0;
  height: 1px;
  border: 0;
  background: #e3e3e3;
}
.title-filter {
  font-family: Poppins;
  font-weight: 600;
  font-size: 20px;
}
.bottom-button {
  padding-left: 20px;
  padding-right: 20px;
  margin-bottom: 20px;
  text-align: center;
}
.bottom-button >>> span {
  text-transform: capitalize !important;
  font-family: Poppins;
  font-weight: 600;
  font-size: 14px;
}
.filter-category,
.filter-waktu-main,
.filter-field {
  font-family: Poppins;
  margin-bottom: 16px;
}
.close-modal {
  font-family: Poppins;
  font-weight: 500;
  color: #424242;
  cursor: pointer;
}
</style>
<style>
.main {
  background: lightgray !important;
  padding: 0px 0px !important;
}
</style>
