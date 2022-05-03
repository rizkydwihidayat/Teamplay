<template>
  <div class="container-top">
    <div class="top-element">
      <h2 class="welcome mt-5">Halo, {{ namaUser }}!</h2>
      <p>
        Selamat datang di Teamplay! <br />
        Anti ribet atur janji buat olahraga bareng.
      </p>
      <br />
      <v-text-field
        v-model="fieldCity"
        solo
        append-icon="mdi-magnify"
        placeholder="Mau maen dimana?"
        class="search"
        @change="searchByCity"
      ></v-text-field>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'TopHome',
  data() {
    return {
      fieldCity: '',
    }
  },
  computed: {
    ...mapState({
      namaUser: (state) => state.user.nameGoogleAcc,
      filterCity: (state) => state.match.filterCity,
    }),
  },
  methods: {
    ...mapMutations({
      setState: 'match/setState',
    }),
    searchByCity() {
      this.setState({ filterCity: this.fieldCity })
      this.$store.$router.push('/search')
    },
  },
}
</script>
<style scoped>
h2.welcome {
  font-size: 24px;
  font-weight: 700;
  font-family: Poppins;
  text-align: left;
  color: white;
}
p {
  font-weight: 300;
  font-size: 14px;
  color: white;
  font-family: Poppins;
}
.top-element {
  padding-left: 20px;
  padding-right: 20px;
}
.v-input__slot {
  background: white !important;
}
.container-top {
  padding-top: 20px;
  padding-bottom: 20px;
  /* background: #0D47A1; */
  background: white;
  background-image: url('~@/assets/img/Home.png');
  background-position: bottom;
}
.search >>> .v-text-field__slot input {
  color: #9e9e9e;
  font-family: Poppins;
}
</style>
