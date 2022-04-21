import Vue from 'vue'
import * as VueGoogleMaps from '~/node_modules/vue2-google-maps'

Vue.use(VueGoogleMaps, {
  load: { key: process.env.teamplay_app_google_map_api_key, libraries: 'places' },
  installComponents: true
})
Vue.component('GmapMap', VueGoogleMaps.Map);