<template>
  <div class="page">
    <!-- <section> -->
    <div v-if="error.statusCode === 404" class="center-page align-center">
      <img src="~/assets/img/notfound.png" width="200" alt="not-found" />
      <p>Oops..<br /><small class="font-grey">Maaf, halaman yang kamu cari<br /> tidak ditemukan.</small></p>
    </div>
    <div v-else class="center-page">
      <img src="~/assets/img/internalerror.png" width="200" alt="internal-error" />
      <p class="notFoundLabel darkGrey--text align-center">
        Internal Error <br /><small class="font-grey">{{ otherError }}</small>
      </p>
    </div>
    <div class="footer-page g-footer">
      <v-btn
        id="btnBackToHome"
        :ripple="false"
        block
        depressed
        rounded
        class="text-none g-button g-button-outlined mt-15 btn-primary align-center"
        to="/"
        >Kembali ke Home</v-btn
      >
    </div>
    <!-- </section> -->
  </div>
</template>

<script>
export default {
  name: 'ErrorPage',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: 'Maaf, halaman yang kamu cari tidak ditemukan.',
      otherError: 'Hubungi operasional Teamplay',
    }
  },
  head() {
    return {
      title: this.error.statusCode === '404' ? 'Tidak Ditemukan' : 'Error',
    }
  },
  // mounted() {
  //   console.warn(this.error)
  // },
}
</script>

<style scoped>
.center-page {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -90%);
}
.footer-page {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -10%);
}
.notFoundLabel {
  margin-top: 32px;
}
.g-footer {
  position: fixed;
  bottom: 0;
  padding: 16px;
}
</style>
