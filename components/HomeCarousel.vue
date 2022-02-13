<template>
  <div class="container-carousel">
    <p>Match minggu ini</p>
    <div class="div-carousel">
      <!-- Using the slider component -->
      <flickity ref="flickity" :options="flickityOptions">
        <div class="carousel-cell"><p class="txt-title">Fun Futsal Bekasi</p></div>
        <div class="carousel-cell"><p class="txt-title">Basket</p></div>
        <div class="carousel-cell"><p class="txt-title">Mini Soccer</p></div>
      </flickity>
      <div class="see-all">
          <v-btn text>Lihat Semua ></v-btn>
      </div>
    </div>
  </div>
</template>
<script>
import Flickity from 'vue-flickity'
export default {
  name: 'HomeCarousel',
  components: {
    Flickity,
  },
  data() {
    return {
      slide: 0,
      sliding: null,
      flickityOptions: {
        initialIndex: 0,
        prevNextButtons: false,
        pageDots: false,
        wrapAround: false,

        // any options from Flickity can be used
      },
    }
  },
  methods: {},
}
</script>
<style scoped>
.container-carousel {
  padding-top: 20px;
  padding-bottom: 20px;
  background: #0d47a1;
}
p {
  color: white;
  font-weight: 500;
  padding-left: 20px;
  font-size: 14px;
  font-family: Poppins;
}
.div-carousel {
  background: #0d47a1;
}
.carousel-cell {
  width: 66%;
  height: 200px;
  margin-right: 20px;
  background: white;
  border-radius: 10px;
  counter-increment: gallery-cell;
  padding: 12px;
}

/* cell number */
.carousel-cell:before {
  display: block;
  text-align: center;
  line-height: 200px;
  color: white;
}
.flickity-slider {
  left: 0px;
  transform: translateX(5.02%);
}
.txt-title {
    font-weight: 600;
    font-size: 16px;
    color: black;
    font-family: Poppins;
}
.see-all {
    margin: 5px;
    text-align: right;
}
.v-btn {
    text-transform: capitalize;
    color: white;
    font-weight: 500;
    font-size: 14px;
    font-family: Poppins;
    letter-spacing: 0;
}
</style>
