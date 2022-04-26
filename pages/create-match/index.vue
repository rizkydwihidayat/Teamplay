<template>
  <!-- <v-main> -->
  <div class="g-transition page">
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
        <span>Buat Permainan</span>
      </div>
    </div>
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
      @keyup.native.enter="valid && submitCreateMatch($event)"
    >
      <div class="filter-category">
        <span class="title">Kategori Olahraga</span>
        <v-chip-group v-model="inputCategory" active-class="primary--text">
          <v-chip
            v-for="data in filterCategory"
            :key="data"
            :value="data"
            @input="checkMinPlayer(data)"
            >{{ data }}</v-chip
          >
        </v-chip-group>
      </div>
      <div class="fields">
        <v-text-field
          v-model="inputName"
          outlined
          placeholder="Nama permainan"
          required
        ></v-text-field>
        <v-autocomplete
          v-model="gender"
          :items="itemsCategory"
          outlined
          small-chips
          placeholder="Kategori pemain"
          required
        ></v-autocomplete>
      </div>
      <div class="filter-player">
        <span class="title">Jumlah Pemain</span>
        <v-layout row wrap>
          <v-flex xs5 class="row-player1">
            <span>Minimum</span>
            <v-text-field
              v-model="minPlayer"
              outlined
              placeholder="Min pemain"
              readonly
              disabled
            ></v-text-field>
          </v-flex>
          <v-flex xs6 class="row-player2">
            <span>Maksimum</span>
            <v-text-field
              v-model="maxPlayer"
              outlined
              placeholder="Max pemain"
              required
            ></v-text-field>
          </v-flex>
        </v-layout>
      </div>
      <div class="fields">
        <span class="title">Lokasi Main</span>
        <vue-autosuggest
          ref="autocomplete"
          v-model="query"
          :suggestions="suggestions"
          :input-props="inputProps"
          :section-configs="sectionConfigs"
          :render-suggestion="renderSuggestion"
          :get-suggestion-value="getSuggestionValue"
          class="autofill mb-16"
          clearable
          required
          @input="Dosearch"
        >
          <template slot>
            <span> Tambah lapangan </span>
          </template>
        </vue-autosuggest>
        <v-card v-if="selected" outlined class="detail-venue">
          <div class="maps-area" style="width: 100%; height: 220px">
            <span> Detail lapangan </span>
            <l-map style="height: 200px" :zoom="zoom" :center="center">
              <l-tile-layer :url="url"></l-tile-layer>
              <l-marker ref="marker" :lat-lng="markerLatLng">
                <l-popup ref="popup">{{ selected.cityName }}</l-popup>
              </l-marker>
            </l-map>
            <br />
            <v-layout row wrap class="venue-info">
              <v-flex xs12>
                <small>Alamat</small><br />
                <p>{{ selected.address }}</p>
              </v-flex>
            </v-layout>
            <v-layout row wrap class="venue-info">
              <v-flex xs6>
                <small>Min. durasi main</small>
                <p>{{ selected.minimumDurationRent }}</p>
              </v-flex>
              <v-flex xs6>
                <small>Harga per jam</small>
                <p>Rp{{ numberFormat(selected.pricePerHours, 0, ',', '.') }}</p>
              </v-flex>
            </v-layout>
          </div>
        </v-card>
        <span class="title">Jadwal Main</span>
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
              required
              outlined
              v-on="on"
              @click="tgl_awal = currentDate"
            ></v-text-field>
          </template>
          <v-date-picker v-model="tgl_awal" full-width scrollable no-title>
            <v-spacer></v-spacer>
            <v-btn depressed color="secondary" @click="modal_tgl_awal = false"
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
        <v-layout row wrap>
          <v-flex xs5 class="row-player1">
            <v-text-field
              v-model="startTime"
              outlined
              required
              placeholder="Waktu mulai"
              append-icon="mdi-clock-outline"
            ></v-text-field>
          </v-flex>
          <v-flex xs1></v-flex>
          <v-flex xs5 class="row-player2">
            <v-text-field
              v-model="endTime"
              outlined
              required
              placeholder="Waktu selesai"
              append-icon="mdi-clock-outline"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <div class="bottom-button">
          <v-layout v-if="selected" row wrap class="total-pay">
            <v-flex xs6><p>Total Bayar</p></v-flex>
            <v-flex xs6 class="align-right"
              ><span>
                Rp{{
                  numberFormat(
                    totalPayment(
                      selected.minimumDurationRent,
                      selected.pricePerHours
                    ),
                    0,
                    ',',
                    '.'
                  )
                }}</span
              ></v-flex
            >
          </v-layout>
          <v-btn
            class="create-btn"
            depressed
            color="primary"
            @click="submitCreateMatch"
          >
            <span> Buat match</span>
          </v-btn>
        </div>
        <!-- <div v-if="selected" style="margin-top: 10px">
          You have selected:
          <code>
            <pre>{{ JSON.stringify(selected, null, 4) }}</pre>
          </code>
        </div> -->
      </div>
    </v-form>
  </div>
  <!-- </v-main> -->
</template>
<script>
import { mapActions, mapState, mapMutations } from 'vuex'
import { VueAutosuggest } from 'vue-autosuggest'
import { LMap, LTileLayer, LMarker, LPopup } from 'vue2-leaflet'
import 'leaflet/dist/leaflet.css'
import { _numberFormat } from '~/utils'

export default {
  name: 'CreateMatch',
  components: {
    VueAutosuggest,
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
  },
  data() {
    return {
      itemsCategory: ['Pria', 'Wanita', 'Campuran'],
      isDisable: false,
      startTime: '',
      endTime: '',
      minPlayer: 0,
      maxPlayer: 0,
      inputName: '',
      isCityId: '',
      totalPay: 0,
      valid: false,
      modal_tgl_awal: false,
      tgl_awal: '',
      gender: '',
      filterCategory: ['Futsal', 'Basket', 'Mini Soccer', 'Sepak Bola'],
      inputCategory: '',
      currentDate: new Date().toISOString().substr(0, 10),
      modal: false,
      searchkey: '',
      showIcon: true,
      query: '',
      inputProps: {
        id: 'autosuggest__input',
        placeholder: 'Nama Lapangan',
        class: 'form-control',
        name: 'hello',
      },
      selected: null,
      suggestions: [],
      sectionConfigs: {
        default: {
          limit: 10,
          label: 'Venue Lapangan',
          onSelected: (selected) => {
            this.selected = selected.item
            this.query = selected.item.venueName
          },
        },
      },
      center: [-6, 106],
      zoom: 12,
      mapTypeId: 'terrain',
      markerLatLng: [-6, 106],
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    }
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.match.isLoading,
      ListVenue: (state) => state.match.listVenue,
    }),
    filteredOptions() {
      return [
        {
          data: this.ListVenue[0].data.filter((option) => {
            return option.id
          }),
        },
      ]
    },
    // computedDateFormatted() {
    //   return this.formatDate(this.date)
    // },
  },
  watch: {
    date(val) {
      this.dateFormatted = this.formatDate(this.date)
    },
  },
  methods: {
    ...mapActions({
      getCity: 'match/getListCity',
      searchVenue: 'match/getListVenue',
      createMatch: 'match/createMatch',
    }),
    ...mapMutations({
      setState: 'match/setState',
    }),
    back() {
      this.$store.$router.push('/')
    },
    formatDate(date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },
    renderSuggestion(suggestion) {
      return suggestion.item.venueName + ', ' + suggestion.item.cityName
    },
    async submitCreateMatch() {
      this.setState({ isLoading: true })
      const bearer = this.$store.state.user.accKey
      const params = {
        venueId: this.selected.id,
        gameName: this.inputName,
        playerCategory: this.gender,
        playDate: this.tgl_awal,
        startTime: this.startTime,
        endTime: this.endTime,
        minPlayer: this.minPlayer,
        maxPlayer: parseInt(this.maxPlayer),
      }
      const resultsearch = await this.createMatch({
        params,
        bearer,
      }).catch((error) => {
        if (error.response.status === 401) {
          const alertMsg = {
            msg: 'Sesi telah berakhir, merefresh halaman',
          }
          this.$store.dispatch('ui/showAlert', alertMsg, { root: true })
        }
        return false
      })

      // eslint-disable-next-line no-prototype-builtins
      if (resultsearch.hasOwnProperty('data') && resultsearch.data) {
        await this.$store
          .dispatch('match/setListMatch', resultsearch)
          .finally(this.setState({ isLoading: false }))
      }
    },
    // eslint-disable-next-line vue/no-dupe-keys
    totalPayment(dur, price) {
      const result = dur * price
      return result
    },
    checkMinPlayer(value) {
      switch (value) {
        case 'Futsal':
          this.minPlayer = 15
          break
        case 'Basket':
          this.minPlayer = 15
          break
        case 'Mini Soccer':
          this.minPlayer = 18
          break
        case 'Sepak Bola':
          this.minPlayer = 25
          break
      }
    },
    async Dosearch() {
      this.setState({ isLoading: true })
      const bearer = this.$store.state.user.accKey
      const keyword = this.query
      const cityID = 24
      const resultsearch = await this.searchVenue({
        keyword,
        cityID,
        bearer,
      }).catch((error) => {
        if (error.response.status === 401) {
          const alertMsg = {
            msg: 'Sesi telah berakhir, merefresh halaman',
          }
          this.$store.dispatch('ui/showAlert', alertMsg, { root: true })
          // this.$store.dispatch('user/refreshAuth', null, { root: true })
          // this.searchkey = ''
          // const searchMsg = {
          //   msg: 'Silahkan lakukan pencarian kembali',
          //   color: 'primary',
          // }
        }
        return false
      })

      // eslint-disable-next-line no-prototype-builtins
      if (resultsearch.hasOwnProperty('data') && resultsearch.data) {
        await this.$store
          .dispatch('match/setListVenue', resultsearch)
          .finally(this.setState({ isLoading: false }))
        this.timeout = setTimeout(() => {
          // this.suggestions = []
          // this.selected = null
          // const venue = this.filterResults(
          //   resultsearch.data,
          //   this.query,
          //   'venueName'
          // )
          // venue.length && this.suggestions.push({ data: venue })
          Promise.all([resultsearch]).then((values) => {
            this.suggestions = []
            this.selected = null
            const venue = this.filterResults(
              resultsearch.data,
              this.query,
              'venueName'
            )
            venue.length && this.suggestions.push({ data: venue })
            // const venue = this.filterResults(values.data, this.query, "title");

            // venue.length &&
            //   this.suggestions.push({ name: "venue", data: venue });
          })
          // this.suggestions = this.listVenue
        }, 25)
        this.setState({ isSearch: true })
      }
    },
    filterResults(data, text, field) {
      return (
        data
          // eslint-disable-next-line array-callback-return
          .filter((item) => {
            if (item[field].toLowerCase().includes(text.toLowerCase())) {
              return item[field]
            }
          })
          .sort()
      )
    },
    getSuggestionValue(suggestion) {
      return suggestion.venueName
    },
    numberFormat(number, decimals, decPoint, thousandSep) {
      return typeof _numberFormat !== 'undefined'
        ? _numberFormat(number, decimals, decPoint, thousandSep)
        : (number, decimals, decPoint, thousandSep)
    },
  },
}
</script>
<style scoped>
small {
  color: #bdbdbd;
}
.total-pay {
  padding: 16px;
}
.total-pay p {
  font-weight: 500;
  color: #424242;
}
.mb-16 {
  margin-bottom: 16px !important;
}
.detail-venue {
  margin-top: 16px;
  padding: 20px;
  height: auto;
  min-height: 400px;
}
.venue-info {
  padding: 0px 16px 0px 16px;
}
.venue-info p {
  font-size: 14px;
}
.filter-search {
  padding: 20px;
  box-shadow: 0 -0.1px 6px 0 rgba(0, 0, 0, 0.08);
  background: #fff !important;
  top: 0px;
  z-index: 5;
  position: fixed;
  width: 100%;
  margin: auto;
  max-width: 480px;
  font-family: Poppins;
}
.filter-search span {
  text-align: center !important;
  font-weight: 600;
  font-size: 20px;
}
.createMatch {
  height: 100vh;
  overflow-x: hidden;
  /* margin-bottom: 20px; */
  padding-bottom: 50px;
  background: #fff !important;
}
.filter-category {
  font-family: Poppins;
  padding: 20px 20px 10px 20px;
  margin-top: 70px;
}
.title {
  font-family: Poppins !important;
  font-weight: 600 !important;
  font-size: 16px !important;
}
.fields,
.filter-player,
.filter-time {
  font-family: Poppins;
  padding-left: 20px;
  padding-right: 20px;
  /* padding-bottom: 20px; */
}
.row-player1 {
  margin-left: 12px;
  margin-right: 16px;
  margin-top: 10px;
}
.row-player2 {
  margin-top: 10px;
}
.bottom-button {
  padding-bottom: 30px;
}
.bottom-button >>> span {
  text-transform: capitalize !important;
  font-family: Poppins;
  font-weight: 600;
  font-size: 16px;
}
.create-btn {
  width: 100% !important;
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
  /* height: 100vh !; */
}
#autosuggest__input {
  outline: none;
  outline: #616161;
  position: relative;
  display: block !important;
  border: 1px solid #616161 !important;
  border-radius: 3px;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
  height: 56px !important;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
}

#autosuggest__input.autosuggest__input-open {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
.autosuggest__results-container {
  position: relative;
  width: 100%;
}

.autosuggest__results {
  font-weight: 300;
  margin: 0;
  position: absolute;
  z-index: 5;
  width: 100%;
  border: 1px solid #e0e0e0;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  background: white;
  padding: 0px 20px 0px 20px;
  max-height: 200px;
  overflow-y: scroll !important;
}

.autosuggest__results ul {
  list-style: none;
  padding-left: 0;
  margin: 5px;
}

.autosuggest__results .autosuggest__results-item {
  cursor: pointer;
  padding: 15px !important;
}

#autosuggest ul:nth-child(1) > .autosuggest__results_title {
  border-top: none;
}

.autosuggest__results .autosuggest__results-before {
  color: gray;
  font-size: 12px;
  margin-left: 0;
  padding: 15px 13px 5px;
  border-top: 1px solid lightgray;
}

.autosuggest__results .autosuggest__results-item:active,
.autosuggest__results .autosuggest__results-item:hover,
.autosuggest__results .autosuggest__results-item:focus,
.autosuggest__results
  .autosuggest__results-item.autosuggest__results-item--highlighted {
  background-color: #f6f6f6;
}
</style>
