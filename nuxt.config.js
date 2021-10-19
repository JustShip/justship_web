export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'justship',
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

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/styles.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/vuelidate' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // Doc: https://oruga.io/documentation/#nuxt
    '@oruga-ui/oruga/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/auth-next',
    '@nuxtjs/apollo',
    '@nuxtjs/dotenv',
    'cookie-universal-nuxt'
  ],

  // Router
  router: {
    middleware: ['auth'],
  },

  // Auth
  auth: {
    redirect: {
      login: '/signin',
      logout: '/',
      home: false,
      user: '/profile',
    },
    strategies: {
      local: {
        token: {
          required: true,
          type: 'JWT',
          global: true
        },
        endpoints: {
          logout: true,
          user: false,
        },
      },
    },
    // User will be redirected on login/logouts.
    watchLoggedIn: true,
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Apollo
  apollo: {
    tokenExpires: 7,
    includeNodeModules: true,
    // Note: Setting JWT would repeat the prefix defined in Apollo `tokenType` in `local` strategy
    authenticationType: '',
    defaultOptions: {
      $query: {
        loadingKey: 'loading',
        fetchPolicy: 'cache-and-network',
      },
    },
    clientConfigs: {
      default: '~/apollo/client.js',
    },
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'es'
    }
  },

  // Oruga
  oruga: {
    includeCss: 'full-vars',
    iconPack: 'mdi'
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
