<template>
  <div id="pageMatchDetail" class="compWrapper g-transition page">
    <!-- section header -->
    <div class="container-header pb-4 pt-4 mb-1">
      <v-row class="container-topbar ml-3 mr-3 mt-4 mb-10">
        <v-btn icon :ripple="false" class="btnBack" @click="back">
          <img
            width="32"
            height="32"
            src="~/assets/svg/ic-back-white.svg"
            alt="back"
          />
        </v-btn>
      </v-row>
      <h2 class="match-title ml-4 mr-4">
        {{ matchdetail.gameName }}
      </h2>
      <v-row class="match-location mr-4 ml-4 mt-2 mb-0">
        <v-chip small color="rgba(255, 255, 255, 0.2)" class="capsule mr-2">{{
          matchdetail.sportCategory
        }}</v-chip>
        <v-chip small color="rgba(255, 255, 255, 0.2)" class="capsule mr-2">{{
          matchdetail.playerCategory
        }}</v-chip>
      </v-row>
      <v-layout row wrap class="match-location mr-4 ml-4 mb-2 mt-2">
        <v-flex xs1 s1
          ><div class="icon-wrapper mr-2">
            <img
              width="20"
              height="20"
              src="~/assets/svg/ic-location-white.svg"
              alt="location"
            /></div
        ></v-flex>
        <v-flex xs9 s9
          ><p>
            {{ matchdetail.venueName }}
          </p></v-flex
        >
      </v-layout>
    </div>

    <!-- section detail match -->
    <div class="section-detail-match">
      <v-row class="waktu-main ma-4">
        <div class="icon-wrapper mr-3">
          <img
            width="20"
            height="20"
            src="~/assets/img/calendar-2.png"
            alt="match date"
          />
        </div>
        <div class="description-wrapper">
          <p class="desc-subdued mb-1">Waktu Main</p>
          <p class="desc-primary mb-1">{{ matchdetail.playDate }}</p>
          <p class="desc-primary mb-0">
            {{ matchdetail.time }}
            <span class="desc-subdued">({{ matchdetail.duration }} jam)</span>
          </p>
        </div>
      </v-row>
      <v-row class="biaya ma-4 pt-2 pb-2">
        <div class="icon-wrapper mr-3">
          <img
            width="20"
            height="20"
            src="~/assets/img/money-3.png"
            alt="match date"
          />
        </div>
        <div class="description-wrapper">
          <p class="desc-subdued mb-1">Biaya</p>
          <p class="desc-primary mb-0">
            <span class="desc-bold"
              >Rp{{ numberFormat(matchdetail.price, 0, ',', '.') }}</span
            >
            / pemain
          </p>
        </div>
      </v-row>
      <div>
        <v-alert outlined text type="info" class="alert" color="#42A5F5">
          <span class="notif">Jangan lupa absen pemain yang datang ya!</span>
        </v-alert>
      </div>
      <!-- CTA -->
      <div class="pa-4">
        <v-btn
          v-if="!btnEndMatch"
          block
          depressed
          rounded
          class="btn-primary txt-capitalize"
          @click="openAbsen"
          >Absen Pemain</v-btn
        >
        <v-btn
          v-else
          block
          depressed
          rounded
          class="btn-primary create-btn txt-capitalize"
          @click="saveAbsen"
        >
          <span> Selesaikan Pertandingan</span>
        </v-btn>
      </div>
    </div>

    <!-- section location -->
    <div class="divider"></div>
    <div class="section-location ma-4">
      <v-row class="section-title ml-0 mr-0 mt-0 mb-2">
        <h3>Lokasi Lapangan</h3>
      </v-row>
      <p class="desc-primary small">
        {{ matchdetail.address }}
      </p>
      <!-- maps -->
      <div class="maps-area" style="width: 100%; height: 220px">
        <l-map style="height: 200px; z-index: 0" :zoom="zoom" :center="center">
          <l-tile-layer :url="url"></l-tile-layer>
          <l-marker ref="marker" :icon="icon" :lat-lng="markerLatLng">
            <l-tooltip :options="{ permanent: true, interactive: true }">
              <small>{{ matchdetail.city }}</small>
            </l-tooltip>
          </l-marker>
        </l-map>
      </div>
      <v-btn
        block
        depressed
        rounded
        small
        class="btn-secondary mb-6"
        @click="goToMaps"
        >Lihat petunjuk jalan</v-btn
      >
    </div>

    <!-- section pemain -->
    <div class="divider"></div>
    <div class="section-pemain">
      <v-row class="section-title ma-4">
        <h3>Pemain</h3>
        <p class="desc-blue mb-0 btn-listplayer" @click="openListPlayer">
          Lihat semua
        </p>
      </v-row>
      <div class="player-mini-list description-wrapper ma-4 pb-2">
        <p class="desc-subdued mb-4">Rata-rata usia 25 tahun</p>
        <v-row class="ma-0">
          <div v-if="matchdetail.totalPayer > 0" class="player-ava mr-1">
            <span class="pl-3">{{
              listPlayer[0].name
                .split(' ')
                .map((x) => x[0].toUpperCase())
                .join('')
            }}</span>
          </div>
          <div
            v-if="matchdetail.totalPayer > 1 || matchdetail.totalPayer === 2"
            class="player-ava mr-1"
          >
            <span class="pl-3">{{
              listPlayer[1].name
                .split(' ')
                .map((x) => x[0].toUpperCase())
                .join('')
            }}</span>
          </div>
          <div
            v-if="matchdetail.totalPayer > 2 || matchdetail.totalPayer === 3"
            class="player-ava mr-1"
          >
            <span class="pl-3">{{
              listPlayer[2].name
                .split(' ')
                .map((x) => x[0].toUpperCase())
                .join('')
            }}</span>
          </div>
          <div v-if="matchdetail.totalPayer > 3" class="player-ava mr-1">
            <span class="pl-3">{{
              listPlayer[3].name
                .split(' ')
                .map((x) => x[0].toUpperCase())
                .join('')
            }}</span>
          </div>
          <div class="player-number">
            <p class="desc-subdued count mb-0">
              ({{ listPlayer.length }}/{{ minplayer }})
            </p>
            <p class="desc-subdued left mb-0">{{ sisaPlayer }} pemain lagi</p>
          </div>
        </v-row>
      </div>
      <v-dialog
        v-model="showdialog"
        transition="dialog-bottom-transition wrap-400"
      >
        <v-card class="modalShare">
          <v-card-title class="headerModal mt-2">
            <v-layout row wrap>
              <v-flex xs2 s2 class="close-modal">
                <div class="align-right" @click="showdialog = false">X</div>
              </v-flex>
              <v-flex xs6 s6>
                <span class="title-filter">Pemain</span>
              </v-flex>
            </v-layout>
          </v-card-title>
          <hr class="hr-divider" />
          <v-card-text class="list-player">
            <p v-if="listPlayer.length === 0">Belum ada yang bergabung</p>
            <div
              v-for="(item, idx) in listPlayer"
              v-else
              :key="idx"
              class="players"
            >
              <span
                >{{ item.name }} ({{ convertAge(item.age) }})
                {{ item.gender.charAt(0) }}
              </span>
            </div>
          </v-card-text>
        </v-card>
      </v-dialog>
    </div>

    <!-- dialog konfirm end match -->
    <v-dialog
      v-model="dialogEndMatch"
      transition="dialog-bottom-transition wrap-400"
    >
      <v-card class="modalEndMatch">
        <v-card-title class="headerModal mt-2">
          <v-layout row wrap>
            <v-flex xs2 s2 class="close-modal">
              <div class="align-right" @click="closeModalFinish">X</div>
            </v-flex>
            <v-flex xs8 s8>
              <span class="title-filter font-bold"
                >Selesaikan pertandingan</span
              >
            </v-flex>
          </v-layout>
        </v-card-title>
        <hr class="hr-divider" />
        <v-card-text class="list-player">
          <div class="top">
            <!-- <div class="ic-1">
                <div class="ic-2">
                  <div class="ic-3"></div>
                </div>
              </div> -->
          </div>
          <span class="align-center"
            >Pastikan semua pemain yang <br />datang sudah diabsen ya!</span
          >
          <div class="pa-4">
            <v-btn
              block
              depressed
              rounded
              class="btn-primary create-btn txt-capitalize"
              @click="saveAbsen"
            >
              <span> Oke, selesaikan pertandingan</span>
            </v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- dialog konfirm exit match -->
    <v-dialog
      v-model="dialogExitMatch"
      width="350"
      persistent
      transition="dialog-bottom-transition wrap-400"
    >
      <v-card>
        <v-card-title class="headerModal mt-2">
          <span class="title-filter font-bold">Batal bergabung</span>
        </v-card-title>
        <hr class="hr-divider" />
        <v-card-text class="list-player">
          <!-- <div class="top">
            </div> -->
          <span class="align-center"
            >Yakin batal bergabung pertandingan ini?</span
          >
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn outlined rounded color="#42A5F5" @click="goExitMatch">
            <span class="txt-capitalize"> Ya, batalkan</span>
          </v-btn>
          <v-btn text depressed rounded @click="dialogExitMatch = false"
            ><span class="txt-capitalize">Tidak</span></v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- dialog absen player -->
    <v-dialog
      v-model="dialogAbsen"
      transition="dialog-bottom-transition wrap-400"
    >
      <v-card class="modalShare">
        <v-card-title class="headerModal mt-2">
          <v-layout row wrap>
            <v-flex xs2 s2 class="close-modal">
              <v-btn
                icon
                :ripple="false"
                class="btnBack"
                @click="dialogAbsen = false"
              >
                <img
                  width="32"
                  height="32"
                  src="~/assets/svg/ic-back-cevron.svg"
                  alt="back"
                />
              </v-btn>
            </v-flex>
            <v-flex xs6 s6>
              <span class="title-filter">Absen pemain</span>
            </v-flex>
          </v-layout>
        </v-card-title>
        <hr class="hr-divider" />
        <v-card-text>
          <p v-if="listPlayer.length === 0">Belum ada yang bergabung</p>
          <div v-else>
            <h2 class="mr-4">
              {{ matchdetail.gameName }}
            </h2>
            <br />
            <v-layout row wrap class="mb-1">
              <v-flex xs1 s1 class="ml-3">
                <div class="icon-wrapper mr-3">
                  <img
                    width="20"
                    height="20"
                    src="~/assets/img/calendar-2.png"
                    alt="match date"
                  />
                </div>
              </v-flex>
              <v-flex xs9 s9>
                <div class="description-wrapper">
                  <p class="desc-primary mb-1 font-bold">
                    {{ matchdetail.playDate }}
                  </p>
                  <p class="desc-subdued mb-0">
                    {{ matchdetail.time }}
                    <span class="desc-subdued"
                      >({{ matchdetail.duration }} jam)</span
                    >
                  </p>
                </div>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs1 s1 class="ml-3">
                <div class="icon-wrapper mr-3">
                  <img
                    width="20"
                    height="20"
                    src="~/assets/img/Vector.png"
                    alt="location"
                  />
                </div>
              </v-flex>
              <v-flex xs9 s9>
                <div class="description-wrapper">
                  <p class="desc-primary mb-1 font-bold">
                    {{ matchdetail.venueName }}
                  </p>
                  <p class="desc-subdued mb-0">
                    {{ matchdetail.address }}
                  </p>
                </div>
              </v-flex>
            </v-layout>
            <br />
            <hr class="hr-divider" />
            <v-checkbox
              v-model="isCheckAll"
              :label="'Hadir semua' + ' (' + listPlayer.length + ')'"
              class="font-bold"
              @click="checkAll"
            >
            </v-checkbox>
            <hr class="hr-divider" />
            <div
              v-for="(item, idx) in listPlayer"
              :key="item[idx]"
              class="players"
            >
              <v-checkbox
                v-model="playerAbsen"
                :value="item"
                :label="
                  item.name +
                  ' (' +
                  convertAge(item.age) +
                  ') ' +
                  item.gender.charAt(0)
                "
                @change="updateCheckall"
              >
                <span
                  >{{ item.name }} ({{ convertAge(item.age) }})
                  {{ item.gender.charAt(0) }}</span
                >
              </v-checkbox>
            </div>
            <div class="pa-4 btn-save-absen">
              <v-btn
                block
                depressed
                rounded
                class="btn-primary create-btn txt-capitalize"
                @click="openSaveAbsen"
              >
                <span> Simpan Absensi Pemain</span>
              </v-btn>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- section host -->
    <div class="divider"></div>
    <div class="section-host ma-4 pb-10">
      <p class="desc-primary">Diselenggarakan oleh</p>
      <v-row class="detail-host ma-0">
        <div class="player-ava mr-3">
          <span>{{ initialName }}</span>
        </div>
        <div class="description-wrapper">
          <v-row style="align-item: center" class="ma-0">
            <p class="desc-bold mb-0 mr-2" style="align-item: center">
              {{ matchdetail.name }}
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
        </div>
      </v-row>
      <v-btn block outlined rounded color="#42A5F5" @click="chatHost">
        <IcWA /><span class="txt-capitalize ml-3"> Hubungi Penyelenggara</span>
      </v-btn>
      <br />
      <v-btn
        depressed
        block
        rounded
        text
        color="#F16060"
        @click="openModalExit"
      >
        <span class="txt-capitalize"> Batal bergabung</span>
      </v-btn>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import { LMap, LTileLayer, LMarker, LTooltip } from 'vue2-leaflet'
import { icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { _numberFormat } from '~/utils'

export default {
  name: 'MatchAbsen',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LTooltip,
    IcWA: () => import('~/components/svg/IcWA'),
  },
  data() {
    return {
      minplayer: 0,
      sisaPlayer: 0,
      showdialog: false,
      playerAbsen: [],
      isCheckAll: false,
      center: [-6.529217, 106.766574],
      zoom: 12,
      markerLatLng: [-6.529217, 106.766574],
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      years: new Date().getFullYear(),
      tempParams: null,
      icon: icon({
        iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
        iconUrl: require('leaflet/dist/images/marker-icon.png'),
        shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
      }),
      btnEndMatch: false,
      dialogEndMatch: false,
      dialogExitMatch: false,
      dialogAbsen: false,
      initialName: '',
      absenPlayer: [],
    }
  },
  head() {
    return {
      title: 'Match Absen',
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'match_absen_default',
          name: 'description',
          content: 'Match Absen',
        },
        {
          hid: 'match_absen_default_keywords',
          name: 'keywords',
          content: 'match, match-absen',
        },
      ],
    }
  },
  computed: {
    ...mapState({
      matchdetail: (state) => state.match.matchdetail,
      latitude: (state) => state.match.lat,
      longitude: (state) => state.match.lng,
      listPlayer: (state) => state.match.listPlayer,
    }),
  },
  async mounted() {
    await this.getMatchDetail()
    await this.getCoordinate()
    // this.$nextTick(() => {
    //   this.$refs.marker.mapObject.openPopup()
    // })
    await this.checkMinPlayer()
    this.center = [
      parseFloat(this.matchdetail.coordinate[0]),
      parseFloat(this.matchdetail.coordinate[1]),
    ]
    this.markerLatLng = [
      parseFloat(this.matchdetail.coordinate[0]),
      parseFloat(this.matchdetail.coordinate[1]),
    ]
    await this.checkCurrentPlayer()
  },
  methods: {
    ...mapActions({
      exitMatch: 'match/exitMatch',
    }),
    BDTime() {
      this.$dayjs.locale('id')
      const result = this.$dayjs().format(
        'dddd' + ', ' + 'D ' + 'MMM ' + 'YYYY'
      )
      return result
    },
    numberFormat(number, decimals, decPoint, thousandSep) {
      return typeof _numberFormat !== 'undefined'
        ? _numberFormat(number, decimals, decPoint, thousandSep)
        : (number, decimals, decPoint, thousandSep)
    },
    checkAll() {
      this.isCheckAll = !this.isCheckAll
      const checked = !this.isCheckAll
      this.playerAbsen = []
      if (checked) {
        for (const key in this.listPlayer) {
          this.playerAbsen.push(this.listPlayer[key])
        }
      } else {
        this.isCheckAll = false
      }
    },
    updateCheckall() {
      if (this.playerAbsen.length === this.listPlayer.length) {
        this.isCheckAll = true
      } else {
        this.isCheckAll = false
      }
    },
    back() {
      this.$router.back()
    },
    getCoordinate() {
      const temp = []
      temp.push(this.matchdetail.coordinate)
    },
    async getMatchDetail(store = this.$store) {
      const id = this.$route.params.id
      const match = await store.dispatch('match/getMatchId', { id })
      await store.dispatch('match/setMatchDetail', match)
      const matchEnd = this.matchdetail.time.slice(7, 13)
      const currentTime = this.$dayjs().hour().toString()
      if (currentTime === matchEnd) {
        this.btnEndMatch = true
      }
      this.initialName = this.matchdetail.name
        .split(' ')
        .map((x) => x[0].toUpperCase())
        .join('')
    },
    goToMaps() {
      window.location.href = `https://maps.google.com?q=${this.center[0]},${this.center[1]}`
    },
    checkMinPlayer() {
      const category = this.matchdetail.sportCategory
      switch (category) {
        case 'Futsal':
          this.minplayer = 15
          break
        case 'Basket':
          this.minplayer = 15
          break
        case 'Mini Soccer':
          this.minplayer = 18
          break
        case 'Sepak Bola':
          this.minplayer = 25
          break
      }
    },
    checkCurrentPlayer() {
      const result = this.listPlayer.length - this.minplayer
      this.sisaPlayer = result
      return this.sisaPlayer
    },
    openListPlayer() {
      this.showdialog = true
    },
    openAbsen() {
      this.dialogAbsen = true
    },
    convertAge(val) {
      if (val < this.years) {
        const result = val
        return result
      } else {
        const result = this.years - val
        return result
      }
    },
    chatHost() {
      const phone = localStorage.getItem('phone')
      if (phone !== 'null') {
        window.location.href = `https://wa.me/${phone}`
      } else {
        const alertMsg = {
          msg: 'Nomor kontak Host tidak valid.',
          color: '#EF6C00',
        }
        this.$store.dispatch('ui/showAlert', alertMsg, { root: true })
      }
    },
    openSaveAbsen() {
      this.dialogEndMatch = true
    },
    async saveAbsen() {
      localStorage.listUsrId = this.absenPlayer
      const matchid = this.$route.params.id
      const bearer = localStorage.getItem('accKey')
      const listUserId = []
      listUserId.push()
      await this.finishMatch({ matchid, bearer, listUserId })
    },
    openModalFinish() {
      this.dialogEndMatch = true
    },
    openModalExit() {
      this.dialogExitMatch = true
    },
    closeModalFinish() {
      this.dialogEndMatch = false
    },
    async goExitMatch() {
      const matchid = this.$route.params.id
      const bearer = localStorage.getItem('accKey')
      await this.exitMatch({ matchid, bearer })
    },
  },
}
</script>
<style scoped>
.notif {
  color: #424242;
  text-align: justify;
}
.alert {
  justify-items: center;
  margin-left: 40px;
  margin-right: 40px;
}
.list-player {
  text-align: center !important;
  /* margin: 35px 12px; */
}
.players {
  margin: 12px 0px;
  padding-bottom: 10px;
  border-bottom: lightgray solid 1px;
}
.btn-listplayer {
  cursor: pointer;
}
.pl-3 {
  padding-left: 3px !important;
}
.btn-save-absen {
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
  right: 0;
  max-width: 480px;
  margin: auto;
}
.modalShare {
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
  right: 0;
  max-width: 480px;
  height: 100vh;
  overflow: scroll;
  margin: auto;
  border-radius: 16px 16px 0px 0px;
  font-family: Poppins;
}
.modalEndMatch {
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
  right: 0;
  max-width: 480px;
  height: 40vh;
  overflow: scroll;
  margin: auto;
  border-radius: 16px 16px 0px 0px;
  font-family: Poppins;
}
.close-modal {
  font-family: Poppins;
  font-weight: 500;
  color: gray;
  cursor: pointer;
  padding-right: 30px;
  padding-left: 0px;
}
.hr-divider {
  margin: 10px 0;
  height: 1px;
  border: 0;
  background: #e3e3e3;
}
.container-header {
  background-image: url('~@/assets/img/futsal-bg.png');
  background-size: cover;
}
.container-topbar {
  justify-content: space-between;
}
.btnBack {
  background: rgba(255, 255, 255, 0.2);
}
h2.match-title {
  font-size: 24px;
  font-weight: 600;
  font-family: Poppins;
  text-align: left;
  color: white;
}
.capsule {
  font-size: 12px;
  font-weight: 400;
  font-family: Poppins;
  text-transform: capitalize !important;
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
  background: rgba(255, 255, 255, 0.2);
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
  /* width: 100%; */
  max-width: 480px !important;
  margin: auto;
  left: 0;
  right: 0;
}
.maps-area >>> .vue-map {
  position: none;
  height: 200px;
  margin: 12px;
}
.top {
  height: 125px;
  width: 100%;
  background-image: url('~@/assets/svg/verify.svg');
  background-position: center;
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
</style>
