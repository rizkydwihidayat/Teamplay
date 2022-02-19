<template>
  <div class="container-top">
    <div class="top-element">
      <h2 class="welcome mt-5">Halo, Bambang!</h2>
      <p>
        Selamat datang di Teamplay! <br />
        Anti ribet atur janji buat olahraga bareng.
      </p>
      <br />
      <v-text-field solo append-icon="mdi-magnify" placeholder="Mau maen dimana?" class="search"></v-text-field>
    </div>
  </div>
</template>
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
  color: #9E9E9E;
  font-family: Poppins;
}
</style>
