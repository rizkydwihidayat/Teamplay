<template>
  <l-map
    ref="map"
    :zoom="zoom"
    :center="[
      position.lat || userLocation.lat || defaultLocation.lat,
      position.lng || userLocation.lng || defaultLocation.lng,
    ]"
    style="height: 300px; width: 100%; z-index: 0"
    @click="onMapClick"
  >
    <l-tile-layer
      :url="tileProvider.url"
      :attribution="tileProvider.attribution"
    />
    <l-marker
      v-if="position.lat && position.lng"
      visible
      draggable
      :icon="icon"
      :lat-lng.sync="position"
      @dragstart="dragging = true"
      @dragend="dragging = false"
    >
      <l-tooltip :content="tooltipContent" :options="{ permanent: true }" />
    </l-marker>
    <v-geosearch :options="geoSearchOptions"></v-geosearch>
  </l-map>
</template>
<script>
import { mapMutations } from 'vuex'
import { LMap, LMarker, LTileLayer, LTooltip } from 'vue2-leaflet'
import { OpenStreetMapProvider } from 'leaflet-geosearch'
import VGeosearch from 'vue2-leaflet-geosearch'
import { icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-geosearch/dist/geosearch.css'

export default {
  name: 'GeoSelector',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LTooltip,
    VGeosearch,
  },
  props: {
    value: {
      type: Object,
      required: true,
    },
    defaultLocation: {
      type: Object,
      default: () => ({
        lat: -6.529217,
        lng: 106.766574,
      }),
    },
  },
  data() {
    return {
      loading: false,
      geoSearchOptions: {
        provider: new OpenStreetMapProvider(),
        showMarker: false,
        autoClose: true,
      },
      userLocation: {},
      icon: icon({
        iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
        iconUrl: require('leaflet/dist/images/marker-icon.png'),
        shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
      }),
      position: {},
      address: '',
      tileProvider: {
        attribution:
          '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      },
      zoom: 12,
      dragging: false,
    }
  },
  head() {
    return {
      link: [
        { rel: 'stylesheet', href: 'https://unpkg.com/leaflet-geosearch@2.6.0/assets/css/leaflet.css' },
      ],
    }
  },
  computed: {
    tooltipContent() {
      if (this.dragging) return '...'
      if (this.loading) return 'Loading...'
      return `<strong>${this.address.replace(
        ',',
        '<br/>'
      )}</strong> <hr/><strong>lat:</strong> ${
        this.position.lat
      }<br/> <strong>lng:</strong> ${this.position.lng}`
    },
  },
  watch: {
    position: {
      deep: true,
      async handler(value) {
        this.address = await this.getAddress()
        this.$emit('input', { position: value, address: this.address })
      },
    },
  },
  mounted() {
    this.getUserPosition()
    this.$refs.map.mapObject.on('geosearch/showlocation', this.onSearch)
  },
  methods: {
    ...mapMutations({
      setState: 'match/setState',
    }),
    async getAddress() {
      this.loading = true
      let address = 'Unresolved address'
      try {
        const { lat, lng } = this.position
        const result = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
        )
        if (result.status === 200) {
          const body = await result.json()
          address = body.display_name
        }
      } catch (e) {
        console.error('Reverse Geocode Error->', e)
      }
      this.loading = false
      return address
    },
    onMapClick(value) {
      // place the marker on the clicked spot
      this.position = value.latlng
      this.setState({ lat: value.latlng.lat })
      this.setState({ lat: value.latlng.lng })
    },
    onSearch(value) {
      const loc = value.location
      this.position = { lat: loc.y, lng: loc.x }
    },
    getUserPosition() {
      if (navigator.geolocation) {
        // get GPS position
        navigator.geolocation.getCurrentPosition((pos) => {
          // set the user location
          this.userLocation = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          }
        })
      }
    },
  },
}
</script>
