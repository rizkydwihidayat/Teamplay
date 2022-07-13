<template>
  <v-main class="main">
    <div id="pageOnboard" class="compWrapper g-transition onboard page">
      <div class="top-element">
        <br /><br /><br /><br />
        <h2>
          <!-- Masuk dengan email
          yang kamu gunakan -->
          Yuk, masuk akun buat<br />
          gabung pertandingan
        </h2>
        <br />
        <div class="login-button">
          <v-btn
            depressed
            large
            color="primary"
            rounded
            @click="submitEmailGoogle"
          >
            <IcGoogle /><span> &nbsp; Masuk dengan Google</span>
          </v-btn>
        </div>
      </div>
      <div class="text-center">
        <small class="text-white"
          >Belum punya akun? <a href="/register">Yuk, daftar!</a></small
        >
      </div>
    </div>
  </v-main>
</template>
<script>
const components = {
  IcGoogle: () => import('~/components/svg/IcGoogle'),
}
export default {
  name: 'OnBoard',
  components,
}
</script>
<style scoped>
.onboard {
  background-image: url('~@/assets/img/onboard.png');
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
  background-size: 375px 812px;
  /* background-color: rgb(11,13,14,.4); */
}
h2 {
  font-family: Poppins;
  font-weight: 600;
  font-size: 24px;
}
.top-element {
  /* position: absolute; */
  top: 80%;
  left: 50%;
  /* width: 300px; */
  /* transform: translate(-50%, -90%); */
}
.login-button {
  /* position: absolute; */
  /* bottom: 20px; */
  left: 0%;
  right: 0%;
  text-align: center;
  margin: 40px 20px;
}
.login-button span {
  color: white;
  text-transform: capitalize !important;
  font-family: Poppins;
  font-weight: 500;
  font-size: 14px;
}
a {
    color: white !important;
}
</style>
