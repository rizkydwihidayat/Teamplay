<template>
  <div class="headBar">
    <div class="container">
      <v-toolbar flat color="transparent">
        <v-btn icon :ripple="false" class="btnBack" @click="back">
          <img width="32" height="32" src="~/assets/svg/ic-back-cevron.svg" alt="<" />
        </v-btn>
        <div></div>
      </v-toolbar>
    </div>
  </div>
</template>
<script>
export default {
  name: "TopBar",
  methods: {
    back() {
        this.$router.back()
    }
  },
}
</script>

<style scoped>
.headBar {
  padding: 0 15px;
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
.headBar >>> .container {
  padding: 0;
}
.headBar >>> .v-toolbar__content {
  padding: 0;
  justify-content: space-between; /* supaya bisa di set align center utk title */
}

/* penyeragaman margin */
.headBar >>> .v-toolbar__content div {
  margin: 0;
}
.headBar >>> .v-toolbar__content > *:first-child {
  margin: 0;
}
/* supaya align center, tambahkan margin sebesar lebar dari left menu */
.headBar >>> .v-toolbar__content > .v-toolbar__title {
  margin-right: 32px;
}
.headTitle {
  font-family: Roboto;
  font-size: 15px;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.33;
  letter-spacing: normal;
  text-align: center;
  color: var(--black);
}
</style>
