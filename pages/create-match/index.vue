<template>
  <div class="g-transition createMatch">
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
      @keyup.native.enter="valid && submitCreateMatch($event)"
    >
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
      <br /><br /><br />
      <div class="filter-category">
        <span class="title">Kategori Olahraga</span>
        <v-chip-group
          v-model="filterCategory"
          active-class="primary--text"
          mandatory
        >
          <v-chip>Futsal</v-chip>
          <v-chip>Basket</v-chip>
          <v-chip>Mini Soccer</v-chip>
          <v-chip>Sepak Bola</v-chip>
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
        <v-text-field outlined placeholder="Nama lapangan"></v-text-field>
        <!-- <small>Pastikan lapangan sudah dibooking ya!</small> -->
      </div>
      <div class="filter-time">
        <span class="title">Jadwal Main</span>
        <v-layout row wrap>
          <v-flex xs5 class="row-player1">
            <v-text-field
              v-model="startTime"
              outlined
              placeholder="Waktu mulai"
            ></v-text-field>
          </v-flex>
          <v-flex xs6 class="row-player2">
            <v-text-field
              v-model="endTime"
              outlined
              placeholder="Waktu selesai"
            ></v-text-field>
          </v-flex>
        </v-layout>
      </div>
      <div class="bottom-button">
        <v-btn class="create-btn" depressed color="primary" @click="goToSearch">
          <span> Buat match</span>
        </v-btn>
      </div>
    </v-form>
  </div>
</template>
<script>
export default {
  name: 'CreateMatch',
  data() {
    return {
      itemsCategory: ['Pria', 'Wanita', 'Campuran'],
      startTime: '',
      endTime: '',
      minPlayer: '',
      maxPlayer: '',
      inputName: '',
      valid: false,
    }
  },
  methods: {
    back() {
      this.$store.$router.push('/')
    },
    submitCreateMatch() {},
  },
}
</script>
<style scoped>
.filter-search {
  padding: 20px;
  box-shadow: 0 -0.1px 6px 0 rgba(0, 0, 0, 0.08);
  background: #fff;
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
}
.filter-category {
  font-family: Poppins;
  padding: 20px;
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
  /* margin-left: 20px; */
  /* margin-right: 16px; */
}
.bottom-button {
  padding-left: 20px;
  padding-right: 20px;
  /* margin-bottom: 60px; */
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
.v-list {
  font-family: Poppins !important;
}
</style>
<style>
.main {
  background: lightgray !important;
  padding: 0px 0px !important;
}
</style>
