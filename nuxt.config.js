const webpack = require('webpack');
const path = require('path');

module.exports = {
  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '',

    mode: 'universal',
    router: {
      // base: '/blog/'
    },
    plugins: [
      new webpack.ProvidePlugin({
        '$': 'jquery',
        '_': 'lodash'
        // ...etc.
      })
    ]
  }
}

export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: process.env.HOME_PATH+'favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' },
      // { rel: 'stylesheet', type: 'text/css', href: '/fonts/CookieRun/cookierun-webfont.css' },
    ]
  },
  // base: '/blog/',
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  env: {
    HOME_PATH: (process.env.NODE_ENV == 'development') ? '/' : '/blog/'
  },
  configureWebpack: {
    // Set up all the aliases we use in our app.
    plugins: [
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 6
      })
    ]
  },
  pwa: {
    name: 'Vue Argon Design',
    themeColor: '#172b4d',
    msTileColor: '#172b4d',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: '#172b4d'
  },
  /*
  ** Global CSS
  */
  css: [
    '~/assets/vendor/nucleo/css/nucleo.css',
    '~/assets/vendor/font-awesome/css/font-awesome.css',
    { src: '~/assets/scss/argon.scss', lang: 'scss' }
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/argon-kit.js'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
      config.resolve.alias['~npm'] = '~/node_modules';
    }
  }
}
