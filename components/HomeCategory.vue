<template>
  <div class="container-category">
    <h2>Kategori Olahraga</h2>
    <v-layout row wrap class="ic-category">
      <v-flex xs2 class="category"
        ><img src="~/assets/img/soccer-ball(1).png" width="36" /></v-flex
      >
      <v-flex xs2 class="category"><img src="~/assets/img/basket-ball.png" width="36" /></v-flex>
      <v-flex xs2 class="category"><img src="~/assets/img/soccer-ball.png" width="36" /></v-flex>
    </v-layout>
    <v-layout row wrap class="ic-category">
        <v-flex xs2 class="txt-category"><span
          >Futsal</span
        ></v-flex>
        <v-flex xs2 class="txt-category"><span
          >Basket</span
        ></v-flex>
        <v-flex xs2 class="txt-category"><span
          >Mini Soccer</span
        ></v-flex>
    </v-layout>
  </div>
</template>

<style scoped>
h2 {
  font-weight: 600;
  margin-bottom: 15px;
  padding-left: 20px;
  font-size: 14px;
  color: #0D47A1;
  font-family: Poppins;
}
.ic-category {
    padding-left: 20px;
}
.category {
  background: #d4e0ff;
  margin: 10px;
  padding: 10px;
  border-radius: 10px;
  text-align: center;
}
.txt-category {
  text-align: center;
  font-size: 12px;
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 10PX;
  font-weight: 600;
  font-family: Poppins;
}
.container-category {
    padding-top: 20px;
    padding-bottom: 20px;
    background: white;
}
</style>
