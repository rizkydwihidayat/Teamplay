<template>
  <v-main>
    <div class="g-transition createMatch">
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
          ></v-text-field>
          <v-autocomplete
            v-model="values"
            :items="itemsCategory"
            outlined
            small-chips
            placeholder="Kategori pemain"
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
              ></v-text-field>
            </v-flex>
          </v-layout>
        </div>
        <div class="fields">
          <span class="title">Lokasi Main</span>
          <v-autocomplete
            v-model="searchkey"
            :append-icon="showIcon ? 'mdi-magnify' : undefined"
            outlined
            :items="ListVenue"
            placeholder="Nama lapangan"
            @keypress="
              ;($event.keyCode > 47 && $event.keyCode < 58) ||
              $event.keyCode === 32 ||
              ($event.keyCode > 96 && $event.keyCode < 123) ||
              ($event.keyCode > 64 && $event.keyCode < 91)
                ? true
                : $event.preventDefault()
            "
            @keyup.enter="Dosearch"
          ></v-autocomplete>
          <!-- <small>Pastikan lapangan sudah dibooking ya!</small> -->
        </div>
        <div class="filter-time">
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
                placeholder="Waktu mulai"
                append-icon="mdi-clock-outline"
              ></v-text-field>
            </v-flex>
            <v-flex xs1></v-flex>
            <v-flex xs5 class="row-player2">
              <v-text-field
                v-model="endTime"
                outlined
                placeholder="Waktu selesai"
                append-icon="mdi-clock-outline"
              ></v-text-field>
            </v-flex>
          </v-layout>
          <div class="bottom-button">
            <v-btn class="create-btn" depressed color="primary">
              <span> Buat match</span>
            </v-btn>
          </div>
        </div>
      </v-form>
    </div>
  </v-main>
</template>
<script>
import { mapActions, mapState, mapMutations } from 'vuex'
export default {
  name: 'CreateMatch',
  data() {
    return {
      itemsCategory: ['Pria', 'Wanita', 'Campuran'],
      startTime: '',
      endTime: '',
      minPlayer: 0,
      maxPlayer: 0,
      inputName: '',
      isCityId: '',
      valid: false,
      modal_tgl_awal: false,
      tgl_awal: '',
      values: '',
      filterCategory: ['Futsal', 'Basket', 'Mini Soccer', 'Sepak Bola'],
      inputCategory: '',
      currentDate: new Date().toISOString().substr(0, 10),
      modal: false,
      searchkey: '',
      showIcon: true,
    }
  },
  computed: {
    ...mapState({
      isLoading: state => state.match.isLoading,
      ListVenue: state => {
        return state.match.listVenue
      },
    }),
    computedDateFormatted() {
      return this.formatDate(this.date)
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
    submitCreateMatch() {},
    checkMinPlayer(value) {
      switch (value) {
        case 'Futsal':
          this.minPlayer = 10
          break
        case 'Basket':
          this.minPlayer = 8
          break
        case 'Mini Soccer':
          this.minPlayer = 8
          break
        case 'Sepak Bola':
          this.minPlayer = 13
          break
      }
    },
    async Dosearch() {
      this.setState({ isLoading: true })
      const bearer = this.$store.state.user.accKey
      const keyword = this.searchkey
      const cityID = 24
      const resultsearch = await this.searchVenue({keyword, cityID, bearer}).catch((error) => {
        if (error.response.status === 401) {
          const alertMsg = {
            msg: 'Sesi telah berakhir, merefresh halaman',
          }
          this.$store.dispatch('ui/showAlert', alertMsg, { root: true })
          // this.$store.dispatch('user/refreshAuth', null, { root: true })
          this.searchkey = ''
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
          .dispatch(
            'match/setListVenue',
            resultsearch
          )
          .finally(this.setState({ isLoading: false }))
      }
      this.setState({ isSearch: true })
    },
  },
}
</script>
<style scoped>
.filter-search {
  padding: 20px;
  box-shadow: 0 -0.1px 6px 0 rgba(0, 0, 0, 0.08);
  background: #fff;
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
  margin-bottom: 20px;
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
}
.row-player1 {
  margin-left: 12px;
  margin-right: 16px;
  margin-top: 10px;
}
.row-player2 {
  margin-top: 10px;
}
/* .bottom-button {
  padding-left: 20px;
  padding-right: 20px;
} */
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
}
</style>
