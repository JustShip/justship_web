const title = 'JustShip'
const description = 'Comunidad de makers creando productos en público y lanzando rápido. Encuentra recursos, herramientas, productos y contacta con otros creativos.'
const image = 'https://justship.to/cover.jpg'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'JustShip',
    htmlAttrs: {
      lang: 'es_ES'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'og:locale', content: 'es_ES' },
      {
        hid: 'description',
        name: 'description',
        content: description
      },
      { hid: 'og:type', name: 'og:type', content: 'website' },
      {
        hid: 'og:site_name',
        name: 'og:site_name',
        content: title
      },
      {
        hid: 'og:title',
        name: 'og:title',
        content: title
      },
      {
        hid: 'og:description',
        name: 'og:description',
        content: description
      },
      {
        hid: 'og:image',
        name: 'og:image',
        property: 'og:image',
        content: image
      },
      {
        hid: 'twitter:card',
        name: 'twitter:card',
        content: 'summary_large_image'
      },
      {
        hid: 'twitter:image:alt',
        name: 'twitter:image:alt',
        content: 'JustShip'
      },
      { hid: 'twitter:site', name: 'twitter:site', content: '@JustShipTo' },
      {
        hid: 'twitter:title',
        name: 'twitter:title',
        content: title
      },
      {
        hid: 'twitter:description',
        name: 'twitter:description',
        content: description
      },
      {
        hid: 'twitter:image',
        name: 'twitter:image',
        content: image
      },
      {
        hid: 'twitter:creator',
        name: 'twitter:creator',
        content: '@JustShipTo'
      }
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
    'cookie-universal-nuxt',
    'nuxt-rfg-icon'
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

  // Favicon
  'rfg-icon': {
    static: true,
    staticPath: 'favicons',
    masterPicture: 'static/favicon.png',
    rfg: {
      masterPicture: 'static/favicon.png',
      iconsPath: '/',
      design: {
        ios: {
          pictureAspect: 'noChange',
          assets: {
            ios6AndPriorIcons: false,
            ios7AndLaterIcons: false,
            precomposedIcons: false,
            declareOnlyDefaultIcon: true
          }
        },
        desktopBrowser: {},
        windows: {
          pictureAspect: 'noChange',
          backgroundColor: '#000000',
          onConflict: 'override',
          assets: {
            windows80Ie10Tile: false,
            windows10Ie11EdgeTiles: {
              small: false,
              medium: true,
              big: false,
              rectangle: false
            }
          }
        },
        androidChrome: {
          pictureAspect: 'shadow',
          themeColor: '#000000',
          manifest: {
            name: 'JustShip',
            startUrl: 'https://justship.to',
            display: 'standalone',
            orientation: 'notSet',
            onConflict: 'override',
            declared: true
          },
          assets: {
            legacyIcon: true,
            lowResolutionIcons: false
          }
        },
        safariPinnedTab: {
          pictureAspect: 'blackAndWhite',
          threshold: 66.40625,
          themeColor: '#000000'
        }
      },
      settings: {
        compression: 3,
        scalingAlgorithm: 'Mitchell',
        errorOnImageTooSmall: false,
        readmeFile: true,
        htmlCodeFile: true,
        usePathAsIs: false
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
