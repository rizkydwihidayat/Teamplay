<template>
  <v-content class="main">
    <div id="pageMatch" class="compWrapper g-transition match">
      <TopBarNav /><br /><br /><br />
      <div class="filter-match">
        <v-chip-group
        v-model="filter"
        active-class="deep-blue--text text--accent-4"
        mandatory
      >
        <v-chip>Semua</v-chip>
        <v-chip>Bergabung</v-chip>
        <v-chip>Batal</v-chip>
        <v-chip>Selesai</v-chip>
      </v-chip-group>
      </div>
      <br /><br /><br /><br />
      <div>
        <v-card class="list-card" max-width="440" outlined>
          <v-list-item three-line>
            <v-layout row wrap>
              <v-flex xs7 class="p-10"><h3>Fun Futsal Bekasi</h3></v-flex>
              <v-flex xs4
                ><v-chip color="green" small>
                  <span class="txt-chips">Bergabung</span>
                </v-chip></v-flex
              >
            </v-layout>
          </v-list-item>
        </v-card>
        <v-card class="list-card" max-width="440" outlined>
          <v-list-item three-line>
            <v-layout row wrap>
              <v-flex xs7 class="p-10"><h3>Fun Futsal Bekasi</h3></v-flex>
              <v-flex xs4
                ><v-chip color="green" small>
                  <span class="txt-chips">Bergabung</span>
                </v-chip></v-flex
              >
            </v-layout>
          </v-list-item>
        </v-card>
        <v-card class="list-card" max-width="440" outlined>
          <v-list-item three-line>
            <v-layout row wrap>
              <v-flex xs7 class="p-10"><h3>Fun Futsal Bekasi</h3></v-flex>
              <v-flex xs4
                ><v-chip color="green" small>
                  <span class="txt-chips">Bergabung</span>
                </v-chip></v-flex
              >
            </v-layout>
          </v-list-item>
        </v-card>
        <v-card class="list-card" max-width="440" outlined>
          <v-list-item three-line>
            <v-layout row wrap>
              <v-flex xs7 class="p-10"><h3>Fun Futsal Bekasi</h3></v-flex>
              <v-flex xs4
                ><v-chip color="green" small>
                  <span class="txt-chips">Bergabung</span>
                </v-chip></v-flex
              >
            </v-layout>
          </v-list-item>
        </v-card>
        <v-card class="list-card" max-width="440" outlined>
          <v-list-item three-line>
            <v-layout row wrap>
              <v-flex xs7 class="p-10"><h3>Fun Futsal Bekasi</h3></v-flex>
              <v-flex xs4
                ><v-chip color="green" small>
                  <span class="txt-chips">Bergabung</span>
                </v-chip></v-flex
              >
            </v-layout>
          </v-list-item>
        </v-card>
      </div>
    </div>
  </v-content>
</template>
<script>
const components = {
  TopBarNav: () => import('~/components/Topbar'),
}
export default {
  name: 'MatchPage',
  components,
  layout: 'bottom_nav',
  data() {
    return {
      filter: '',
    }
  },
}
</script>
<style scoped>
.match {
  padding-top: 20px;
  padding-bottom: 20px;
  background: white;
}
.list-card {
  margin: 20px;
  width: 100%;
}
.filter-match {
  padding: 20px;
  border-bottom: 1px solid #757575;
  border-top: 1px solid #757575;
  /* padding: 0 15px; */
  background: #fff;
  z-index: 5;
  clear: both;
  position: fixed;
  width: 100%;
  margin: auto;
  left: 0;
  right: 0;
  max-width: 480px;
}
</style>
<style>
.main {
  background: lightgray !important;
}
</style>
