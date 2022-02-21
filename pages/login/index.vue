<template>
  <v-content class="main">
    <div id="pageLogin" class="compWrapper g-transition">
      <div class="top-login">
        <h2>
          Masuk dengan email<br />
          yang kamu gunakan
        </h2>
      </div>
      <div class="bottom-button">
        <v-btn depressed color="primary" outlined rounded>
          <span> Lanjutkan dengan Google</span>
        </v-btn>
      </div>
      <div class="divider"><span>atau</span></div>
      <div class="bottom-button">
        <v-btn depressed color="grey" outlined rounded>
          <span> Email</span>
        </v-btn>
      </div>
    </div>
  </v-content>
</template>
<script>
export default {
  name: 'LoginPage',
}
</script>
<style scoped>
.top-login {
  /* background: white !important; */
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 80px;
  margin-bottom: 20px;
}
h2 {
  font-family: Poppins;
  font-weight: 600;
  font-size: 24px;
}
.bottom-button {
  padding-left: 20px;
  padding-right: 20px;
}
.bottom-button >>> span {
  text-transform: capitalize !important;
  font-family: Poppins;
  font-weight: 600;
  font-size: 16px;
}
.v-btn {
  width: 100% !important;
}
span {
  font-family: Poppins;
}
.divider {
  color: #757575;
  padding-left: 20px;
  padding-right: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
}
.main {
  background: lightgray !important;
}
#pageLogin {
    background: white;
    height: 100vh;
}
</style>
