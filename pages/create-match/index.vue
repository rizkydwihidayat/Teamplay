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
        </vue-autosuggest>
        <div v-if="showBtnAdd" class="mb-10">
          <v-btn depressed color="primary" outlined rounded @click="addNewVenue"
            >Tambah Lapangan</v-btn
          >
        </div>
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
        <v-dialog
          v-model="showdialogadd"
          transition="dialog-bottom-transition wrap-400"
        >
          <v-card class="modalShare">
            <v-card-title class="headerModal mt-2">
              <v-layout row wrap>
                <v-flex xs2 s2 class="close-modal">
                  <div class="align-right" @click="closeDialog">X</div>
                </v-flex>
                <v-flex xs6 s6>
                  <span class="title-filter">Tambah Lapangan</span>
                </v-flex>
              </v-layout>
            </v-card-title>
            <hr class="hr-divider" />
            <v-card-text>
              <v-form
                ref="form"
                v-model="valid"
                lazy-validation
                @keyup.native.enter="valid && submitAddVenue($event)"
              >
                <div class="fields">
                  <v-text-field
                    v-model="inputLapangan"
                    outlined
                    placeholder="Nama lapangan"
                    required
                  ></v-text-field>
                  <!-- <v-text-field
                    v-model="inputKota"
                    outlined
                    placeholder="Kota"
                    required
                  ></v-text-field> -->
                  <vue-autosuggest
                    ref="autocity"
                    v-model="inputKota"
                    :suggestions="cities"
                    :input-props="cityProps"
                    :section-configs="cityConfigs"
                    :render-suggestion="citySuggestion"
                    :get-suggestion-value="getSuggestionCity"
                    class="autofill mb-16"
                    clearable
                    required
                    @input="Searchcity"
                  >
                  </vue-autosuggest>
                  <div
                    class="maps-area"
                    style="height: 300px; width: 100%; margin-bottom: 15px"
                  >
                    <GeoSelector :key="key" v-model="location" />
                  </div>
                  <v-textarea
                    v-model="inputAlamat"
                    placeholder="Alamat lengkap"
                    auto-grow
                    outlined
                    rows="3"
                    row-height="25"
                  ></v-textarea>
                  <v-text-field
                    v-model="inputSewa"
                    outlined
                    placeholder="Harga sewa per jam"
                    required
                    @keypress="checkValue($event)"
                  ></v-text-field>
                  <v-text-field
                    v-model="inputDurasi"
                    outlined
                    placeholder="Minimum durasi sewa"
                    required
                    @keypress="checkValue($event)"
                  ></v-text-field>
                  <div class="mb-10">
                    <span class="title">Kategori Olahraga</span>
                    <v-chip-group
                      v-model="inputCategory"
                      active-class="primary--text"
                    >
                      <v-chip
                        v-for="data in filterCategory"
                        :key="data"
                        :value="data"
                        @input="checkMinPlayer(data)"
                        >{{ data }}</v-chip
                      >
                    </v-chip-group>
                  </div>
                  <v-alert outlined text type="warning" icon="mdi-alert-circle">
                    <span
                      >Harga sewa /jam dan minimum durasi sewa jangan salah isi
                      ya!</span
                    >
                  </v-alert>
                  <v-btn
                    class="create-btn"
                    depressed
                    color="primary"
                    :disabled="!valid"
                    @click="submitAddVenue"
                  >
                    <span> Simpan</span>
                  </v-btn>
                </div>
              </v-form>
            </v-card-text>
          </v-card>
        </v-dialog>
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
            <v-menu
              ref="menu"
              v-model="startTime"
              :close-on-content-click="false"
              :nudge-right="40"
              :return-value.sync="time"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template #activator="{ on, attrs }">
                <v-text-field
                  v-model="time"
                  outlined
                  required
                  placeholder="Waktu mulai"
                  append-icon="mdi-clock-outline"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-time-picker
                v-if="startTime"
                ref="picker"
                v-model="time"
                format="24hr"
                class="custom-time-picker"
                :class="{ 'use-hours-only': useHoursOnly }"
                @click:hour="selectingHourIfUseHoursOnly(time)"
              ></v-time-picker>
            </v-menu>
          </v-flex>
          <v-flex xs1></v-flex>
          <v-flex xs5 class="row-player2">
            <v-menu
              ref="menu2"
              v-model="endTime"
              :close-on-content-click="false"
              :nudge-right="40"
              :return-value.sync="time2"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template #activator="{ on, attrs }">
                <v-text-field
                  v-model="time2"
                  outlined
                  required
                  placeholder="Waktu selesai"
                  append-icon="mdi-clock-outline"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-time-picker
                v-if="endTime"
                ref="picker2"
                v-model="time2"
                format="24hr"
                class="custom-time-picker"
                :class="{ 'use-hours-only': useHoursOnly }"
                @click:hour="selectingEndTime(time2)"
              ></v-time-picker>
            </v-menu>
          </v-flex>
        </v-layout>
        <div class="bottom-button">
          <v-layout v-if="selected" row wrap class="total-pay">
            <v-flex xs6><p>Total Bayar</p></v-flex>
            <v-flex xs6 class="align-right"
              ><span>
                Rp{{
                  numberFormat(
                    totalPayment(selected.pricePerHours),
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
            :disabled="!valid"
            @click="submitCreateMatch"
          >
            <span> Buat match</span>
          </v-btn>
        </div>
      </div>
    </v-form>
  </div>
  <!-- </v-main> -->
</template>
<script>
import { mapActions, mapState, mapMutations } from 'vuex'
import { VueAutosuggest } from 'vue-autosuggest'
import { LMap, LTileLayer, LMarker, LPopup } from 'vue2-leaflet'
import GeoSelector from '~/components/GeoSelector'
import { _numberFormat } from '~/utils'

export default {
  name: 'CreateMatch',
  components: {
    VueAutosuggest,
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    // LGeosearch,
    GeoSelector,
  },
  data() {
    return {
      itemsCategory: ['Pria', 'Wanita', 'Campuran'],
      itemsCity: [],
      key: 1,
      isDisable: false,
      time: "00:00",
      time2: "00:00",
      startTime: false,
      endTime: '',
      minPlayer: 0,
      maxPlayer: 0,
      inputName: '',
      inputLapangan: '',
      inputKota: '',
      inputAlamat: '',
      inputDurasi: '',
      inputSewa: '',
      isCityId: 0,
      totalPay: 0,
      valid: true,
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
      cityProps: {
        id: 'autosuggest__input',
        placeholder: 'Kota',
        class: 'form-control',
        name: 'hello',
      },
      selected: null,
      selectedCity: null,
      suggestions: [],
      cities: [],
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
      cityConfigs: {
        default: {
          limit: 10,
          label: 'Daftar Kota',
          onSelected: (selected) => {
            this.selectedCity = selected.item
            this.inputKota = selected.item.name
          },
        },
      },
      center: [-6.529217, 106.766574],
      zoom: 12,
      mapTypeId: 'terrain',
      markerLatLng: [-6.529217, 106.766574],
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      tempTime: '',
      showdialogadd: false,
      showBtnAdd: false,
      sport: '',
      location: {},
      useHoursOnly: true,
    }
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.match.isLoading,
      ListVenue: (state) => state.match.listVenue,
      timeDur: (state) => state.match.timeDur,
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
    addNewVenue() {
      this.showdialogadd = true
    },
    closeDialog() {
      this.showdialogadd = false
    },
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
    citySuggestion(cities) {
      return cities.item.name
    },
    async submitAddVenue() {
      this.showdialogadd = false
      this.query = this.inputLapangan
      await this.Dosearch()
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
      })
        .then(() => {
          this.$store.$router.push('/')
        })
        .catch((error) => {
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
    checkEndTime(e) {
      const start = parseInt(this.startTime)
      const end = parseInt(e)
      const temp = end - start
      const result = '1-' + temp.toString()
      this.setState({ timeDur: result })
    },
    // eslint-disable-next-line vue/no-dupe-keys
    totalPayment(price) {
      const calculated = parseInt(this.endTime) - parseInt(this.startTime)
      const result = calculated * price
      return result
    },
    checkMinPlayer(value) {
      switch (value) {
        case 'Futsal':
          this.minPlayer = 15
          this.sport = 'Futsal'
          break
        case 'Basket':
          this.minPlayer = 15
          this.sport = 'Basket'
          break
        case 'Mini Soccer':
          this.minPlayer = 18
          this.sport = 'Mini Soccer'
          break
        case 'Sepak Bola':
          this.minPlayer = 25
          this.sport = 'Sepak Bola'
          break
      }
    },
    async Dosearch() {
      this.setState({ isLoading: true })
      if (this.query.length === 3 && this.isCityId === 0) {
        const bearer = this.$store.state.user.accKey
        const keyword = this.query
        const cityID = 24
        const sport = this.sport
        const resultsearch = await this.searchVenue({
          keyword,
          cityID,
          bearer,
          sport,
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
        this.showBtnAdd = true
      } else if (this.isCityId !== 0) {
        const bearer = this.$store.state.user.accKey
        const keyword = this.query
        const cityID = this.isCityId
        const sport = this.sport
        const resultsearch = await this.searchVenue({
          keyword,
          cityID,
          bearer,
          sport,
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
        this.showBtnAdd = true
      }
    },
    async Searchcity() {
      this.setState({ isLoading: true })
      if (this.inputKota.length >= 4) {
        const keyword = this.inputKota
        const result = await this.getCity({ keyword }).catch((error) => {
          if (error.response.status === 401) {
            const alertMsg = {
              msg: 'Sesi telah berakhir, merefresh halaman',
            }
            this.$store.dispatch('ui/showAlert', alertMsg, { root: true })
          }
          return false
        })
        // eslint-disable-next-line no-prototype-builtins
        if (result.hasOwnProperty('data') && result.data) {
          await this.$store
            .dispatch('match/setListCity', result)
            .finally(this.setState({ isLoading: false }))
          this.timeout = setTimeout(() => {
            Promise.all([result]).then((values) => {
              this.cities = []
              this.selectedCity = null
              const city = this.filterResults(
                result.data,
                this.inputKota,
                'name'
              )
              city.length && this.cities.push({ data: city })
              // const venue = this.filterResults(values.data, this.query, "title");
              // venue.length &&
              //   this.suggestions.push({ name: "venue", data: venue });
            })
            // if (this.selectedCity !== null) {
            //   // this.isCityId = this.selectedCity.id
            //   console.warn(this.selectedCity.id);
            // }
            // this.suggestions = this.listVenue
          }, 25)
          this.setState({ isSearch: true })
        }
        if (this.selectedCity !== null) {
          this.isCityId = this.selectedCity.id
          console.warn(this.isCityId)
        }
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
    getSuggestionCity(cities) {
      return cities.name
    },
    numberFormat(number, decimals, decPoint, thousandSep) {
      return typeof _numberFormat !== 'undefined'
        ? _numberFormat(number, decimals, decPoint, thousandSep)
        : (number, decimals, decPoint, thousandSep)
    },
    checkValue(evt) {
      evt = evt || window.event
      const charCode = evt.which ? evt.which : evt.keyCode
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        evt.preventDefault()
      } else {
        return true
      }
    },
    selectingHourIfUseHoursOnly(time) {
      if (this.useHoursOnly) {
        this.$nextTick(() => {
          this.$refs.picker.selectingHour = true;
          this.$refs.menu.save(time)
        });
      }
    },
    selectingEndTime(time) {
      if (this.useHoursOnly) {
        this.$nextTick(() => {
          this.$refs.picker2.selectingHour = true;
          this.$refs.menu2.save(time)
        });
      }
    }
  },
}
</script>
<style scoped>
.modalShare {
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
  right: 0;
  max-width: 480px;
  max-height: 800px;
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
.close-modal {
  font-family: Poppins;
  font-weight: 500;
  color: #424242;
  cursor: pointer;
  padding-right: 30px;
}
.title-filter {
  font-family: Poppins;
  font-weight: 600;
  font-size: 20px;
}
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
