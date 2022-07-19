<template>
  <div class="g-transition search page">
    <div class="headBar">
      <div class="container">
        <div class="filter-search">
          <div class="top-filter">
            <v-layout row wrap class="p-12-20">
              <v-flex xs1 s1>
                <v-btn icon :ripple="false" class="btnBack" @click="back">
                  <img
                    width="32"
                    height="32"
                    src="~/assets/svg/ic-back-cevron.svg"
                    alt="<"
                  />
                </v-btn>
              </v-flex>
              <v-flex xs10 s10>
                <v-text-field v-model="fieldCity" outlined dense class="field-city" placeholder="Semua Kota" @change="getByCity"></v-text-field>
                <p class="date">
                  {{ dateFormat(currentDate) }} - {{ dateFormat(lastday) }}
                </p>
              </v-flex>
            </v-layout>
          </div>

          <v-chip-group v-model="filter" active-class="primary--text" mandatory>
            <div class="filter">
              <v-chip @click="openFilter">Filter</v-chip>
            </div>
            <v-chip value="semua" @click="useFilter">Semua</v-chip>
            <v-chip
              v-model="isMiniSoccer"
              value="Mini Soccer"
              @click="useFilter"
              >Mini Soccer</v-chip
            >
            <v-chip v-model="isFutsal" value="Futsal" @click="useFilter"
              >Futsal</v-chip
            >
            <v-chip v-model="isBasket" value="Basket" @click="useFilter"
              >Basket</v-chip
            >
            <v-chip v-model="isSoccer" value="Sepak Bola" @click="useFilter"
              >Sepak Bola</v-chip
            >
          </v-chip-group>
        </div>

        <!-- card list -->
        <div v-if="isLoading" class="align-center loading">
          <v-progress-circular
            color="#0d47a1"
            :indeterminate="isLoading"
            :size="35"
            :width="2"
          ></v-progress-circular>
        </div>
        <div v-else-if="listAllMatch.length === 0" class="card">
          <h4 class="empt-data">
            Hasil pencarian tidak ditemukan. <br />
            Silahkan perbarui filter, <br />untuk menampilkan data.
          </h4>
        </div>
        <div v-else class="card">
          <div v-for="(item, idx) in listAllMatch" :key="idx" class="list-card">
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
          <br />
        </div>
        <!-- end of card list -->

        <v-dialog
          v-model="showdialog"
          transition="dialog-bottom-transition wrap-400"
        >
          <v-card class="modalShare">
            <v-card-title class="headerModal mt-2">
              <v-layout row wrap>
                <v-flex xs2 s2 class="close-modal">
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
                  ref="dialog_tgl_awal"
                  v-model="modal_tgl_awal"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="auto"
                  class="datepicker customField"
                >
                  <template #activator="{ on, attrs }">
                    <v-text-field
                      slot="activator"
                      v-model="tgl_awal"
                      clearable
                      persistent-hint
                      append-icon="mdi-calendar"
                      v-bind="attrs"
                      outlined
                      v-on="on"
                      @click="tgl_awal = currentDate"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="tgl_awal"
                    full-width
                    scrollable
                    no-title
                  >
                    <v-spacer></v-spacer>
                    <v-btn
                      depressed
                      color="secondary"
                      @click="modal_tgl_awal = false"
                      >Cancel</v-btn
                    >
                    <v-btn
                      depressed
                      color="primary"
                      @click="$refs.dialog_tgl_awal.save(tgl_awal)"
                      >OK</v-btn
                    >
                  </v-date-picker>
                </v-menu>
              </div>
              <div class="filter-category">
                <h3>Kategori Pemain</h3>
                <v-chip-group
                  v-model="filterGender"
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
                  label="Pagi (06.00 - 12.00)"
                  hide-details
                ></v-checkbox>
                <v-checkbox
                  label="Siang (12.00 - 15.00)"
                  hide-details
                ></v-checkbox>
                <v-checkbox
                  label="Sore (15.00 - 18.00)"
                  hide-details
                ></v-checkbox>
                <v-checkbox
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
import { mapState, mapMutations } from 'vuex'
import { _formatDateTime } from '~/utils'
export default {
  name: 'SearchPage',
  data() {
    return {
      showdialog: false,
      filterGender: ['Pria', 'Wanita', 'Campuran'],
      inputGender: '',
      listMatch: [],
      tempList: [],
      inputCategory: '',
      filterCategory: [
        'Semua',
        'Mini Soccer',
        'Futsal',
        'Basket',
        'Sepak Bola',
      ],
      currentDate: new Date().toISOString().substr(0, 10),
      modal_tgl_awal: false,
      tgl_awal: '',
      fieldCity: '',
      lastday: '',
      isFutsal: '',
      isSoccer: '',
      isBasket: '',
      isMiniSoccer: '',
      catFilter: '',
    }
  },
  computed: {
    ...mapState({
      listAllMatch: (state) => state.match.listMatch,
      filterCity: (state) => state.match.filterCity,
      timeDur: (state) => state.match.timeDur,
      Futsal: (state) => state.match.isFutsal,
      Basket: (state) => state.match.isBasket,
      MiniSoccer: (state) => state.match.isMiniSoccer,
      Soccer: (state) => state.match.isSoccer,
      isLoading: (state) => state.match.isLoading,
    }),
  },
  watch: {
    date(val) {
      this.dateFormatted = this.formatDate(this.date)
    },
  },
  async mounted() {
    if (this.filterCity === '') {
      this.fieldCity = ''
      await this.getMatch(this.catFilter)
      await this.checkCategory()
    } else {
      this.fieldCity = this.filterCity
      await this.getMatch(this.catFilter)
      await this.checkCategory()
    }
  },
  methods: {
    ...mapMutations({
      setState: 'match/setState',
    }),
    async getMatch(store = this.$store) {
      this.setState({ isLoading: true })
      const week = new Date()
      week.setDate(week.getDate() + 7)
      this.lastday = week.toISOString().substr(0, 10)
      const params = {
        city: this.fieldCity,
        startDate: this.currentDate,
        endDate: week.toISOString().substr(0, 10),
        time: this.timeDur,
      }
      const listData = await this.$store.dispatch('match/getListMatch', {
        params,
      })

      if (this.catFilter === 'Futsal' || this.Futsal === true) {
        const test = listData.data.filter(
          (item) => item.match.sportCategory === 'Futsal'
        )
        await this.$store.dispatch('match/setListMatch', test)
      } else if (this.catFilter === 'Mini Soccer' || this.MiniSoccer === true) {
        const test = listData.data.filter(
          (item) => item.match.sportCategory === 'Mini Soccer'
        )
        await this.$store.dispatch('match/setListMatch', test)
      } else if (this.catFilter === 'Basket' || this.Basket === true) {
        const test = listData.data.filter(
          (item) => item.match.sportCategory === 'Basket'
        )
        await this.$store.dispatch('match/setListMatch', test)
      } else if (this.catFilter === 'Sepak Bola' || this.Soccer === true) {
        const test = listData.data.filter(
          (item) => item.match.sportCategory === 'Sepak Bola'
        )
        await this.$store.dispatch('match/setListMatch', test)
      } else if (this.catFilter === 'Semua' || this.fieldCity !== 'undefined') {
        await this.$store.dispatch('match/setListMatch', listData)
      }
    },
    useFilter(val) {
      const filter = val.target.textContent
      this.catFilter = filter
      this.getMatch(filter)
    },
    checkCategory() {
      if (this.Futsal === true) {
        this.catFilter = 'Futsal'
        this.isFutsal = 'Futsal'
      } else if (this.Basket === true) {
        this.catFilter = 'Basket'
        this.isBasket = 'Basket'
      } else if (this.MiniSoccer === true) {
        this.catFilter = 'Mini Soccer'
        this.isMiniSoccer = 'Mini Soccer'
      } else if (this.Soccer === true) {
        this.catFilter = 'Soccer'
        this.isSoccer = 'Soccer'
      }
    },
    getByCity(e) {
      this.fieldCity = e
      this.getMatch(this.fieldCity)
    },
    back() {
      this.setState({ isFutsal: false })
      this.setState({ isBasket: false })
      this.setState({ isMiniSoccer: false })
      this.setState({ isSoccer: false })
      this.setState({ filterCity: '' })
      this.$router.push({path: '/'})
    },
    openFilter() {
      this.showdialog = true
    },
    closeDialog() {
      this.showdialog = false
    },
    formatDate(date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },
    dateFormat(date) {
      return typeof _formatDateTime !== 'undefined'
        ? _formatDateTime(date, 'short', true)
        : date
    },
    goToDetailMatch(id) {
      this.$router.push(`/match/${id}`)
    },
  },
}
</script>
<style scoped>
.loading {
  margin-top: 160px;
}
.field-city {
  margin: 0px;
  padding: 0px;
}
.empt-data {
  text-align: center !important;
  color: #939393;
  font-size: 14px;
  font-weight: 400;
  padding-top: 75px;
  /* padding-left: 12px;
  padding-right: 12px; */
}
.date {
  /* margin-left: 40px; */
  font-size: 12px;
  margin-bottom: 0px;
  margin-top: -15px;
}
h3 {
  font-weight: 600;
  padding-left: 20px;
  padding-top: 12px;
  font-family: Poppins;
}
.pl-20 {
  padding-left: 20px;
}
.pl-16 {
  padding-left: 18px !important;
}
.pr-16 {
  padding-right: 18px !important;
}
.fs-12 {
  font-size: 12px;
  color: black !important;
}
.fs-10 {
  font-size: 10px;
  font-weight: 600;
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
.red-text {
  color: #f16060 !important;
  margin-left: 10px;
}
.search {
  padding-top: 20px;
  padding-bottom: 20px;
  background: white;
  height: 100%;
  font-family: Poppins;
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
  /* padding: 10px 0px 0px 0px; */
}
.top-filter {
  margin-bottom: 10px;
}
.top-filter span {
  font-weight: 600;
  font-size: 18px;
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
.card {
  margin-top: 160px;
  margin-bottom: 20px;
  height: 100vh;
}
.list-card {
  margin: 20px;
  /* width: 100%; */
  font-family: Poppins;
  /* padding: 15px 10px 10px 15px; */
  /* border-radius: 15px; */
}
.list-card span {
  font-family: Poppins;
  color: white;
}
.txt-chips {
  font-family: Poppins;
  font-weight: 500;
  color: #3197F3 !important;
}
.chips {
  padding-top: 5px;
  padding-left: 20px;
  padding-bottom: 12px;
  margin-bottom: 10px;
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
  font-family: Poppins !important;
  margin-bottom: 16px;
}
.close-modal {
  font-family: Poppins;
  font-weight: 500;
  color: #424242;
  cursor: pointer;
  padding-right: 30px;
}
.btn-filter {
  background: #dfe7ff;
  color: #2962ff;
  text-transform: capitalize;
}
.v-list,
.v-picker {
  font-family: Poppins !important;
}
.customField >>> .v-text-field__slot input {
  margin-top: 0;
  height: 48px;
  max-height: 48px;
  font-size: 16px;
  padding: 0 5px;
  font-family: Poppins !important;
}
.v-btn {
  text-transform: capitalize !important;
}
</style>
<style>
.main {
  background: lightgray !important;
  padding: 0px 0px !important;
}
</style>
