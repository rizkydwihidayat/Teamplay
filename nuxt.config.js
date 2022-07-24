import colors from 'vuetify/es5/util/colors'

export default {
  mode: 'spa',
  server: {
    port: 3000
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: process.env.TEAMPLAY_APP_TITLE,
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  manifest: {
    lang: 'id',
    name: process.env.TEAMPLAY_APP_TITLE,
    theme_color: '#2962ff',
    display: 'standalone'
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/style/teamplay.css',
    '~/assets/style/app.scss',
    '~/node_modules/leaflet/dist/leaflet.css',
    '~/node_modules/leaflet-geosearch/dist/geosearch.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '@/plugins/persistedstate', ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/google-fonts',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    '@nuxtjs/dayjs',
    '@nuxtjs/auth'
  ],
  auth: {
    strategies: {
      google: {
        client_id: '491456573984-j175qnc1pntjdfrhp6sgui3q6qduatih.apps.googleusercontent.com',
        codeChallengeMethod: '',
        responseType: 'token id_token',
        scope: ['profile', 'email'],
      },
    }
  },
  // router: {
  //   middleware: ["auth"],
  // },
  dayjs: {
    locales: ['id'],
    defaultLocale: 'id',
    plugins: ['relativeTime', 'advancedFormat'],
},

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    // baseURL: 'http://localhost:3000',
    baseURL: 'https://api.naufalbahri.com/api/v1',
    retry: { retries: 3 },
    proxy: true,
    proxyHeaders: false,
    credentials: false
  },

  publicRuntimeConfig: {
    axios: {
      browserBaseURL: process.env.TEAMPLAY_API_URL
    }
  },

  privateRuntimeConfig: {
    axios: {
      baseURL: process.env.TEAMPLAY_API_URL
    }
  },

  proxy: {
    '/api/v1': { target: 'https://api.naufalbahri.com', pathRewrite: {'^/api/v1': ''}, changeOrigin: true }
  },

  storage: {
    vuex: false, // boolean or {namespace}
    localStorage: { prefix: 'teamplay_' }, // boolean or {prefix }
    cookie: false, // boolean or {prefix, options }
    initialState: false, // Object {}
    ignoreExceptions: false //
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      light: true,
      themes: {
        light: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  googleFonts: {
    families: {
      // a simple name
      Roboto: true,
  
      // a name with spaces
      'Josefin+Sans': true,
  
      // specific font weights
      Poppins: [300, 400, 500, 600, 700, 800, 900],
    }
  },

  generate: {
    // dir: 'dist',
    fallback: true
  },

  target: 'static'
}
