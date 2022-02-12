<template>
  <div>
    <div class="top-element">
      <h2 class="welcome mt-5">Halo, Bambang!</h2>
      <p>
        Selamat datang di Teamplay! <br />
        Anti ribet atur janji buat olahraga bareng.
      </p>
      <v-text-field solo append-icon="mdi-magnify"></v-text-field>
    </div>
  </div>
  <!-- <v-card flat>
    <v-card-text class="text-xs-center">
    <div class="top-element">

    </div>
      <h2 class="welcome mt-5">
        Halo, Bambang!
        <br>
      </h2>
      <p>Selamat datang di Teamplay! Anti ribet atur janji buat olahraga bareng.</p>
    </v-card-text>
  </v-card> -->
</template>
<style scoped>
h2.welcome {
  font-size: 24px;
  font-weight: 900 !important;
  /* line-height: 1.26; */
  text-align: left;
  color: white;
}
p {
  font-weight: 700;
  font-size: 14px !important;
  color: white;
}
.top-element {
  padding-left: 20px;
  padding-right: 20px;
}
.v-input__slot {
    background: white !important;
}
</style>
