const webpack = require('webpack');
const path = require('path');

const isDev = (process.env.NODE_ENV == 'development');
const base_path = isDev ? '/' : '/blog/';

const routerBase = process.env.DEPLOY_ENV === 'GH_PAGES' ? {
  router: {
    base: base_path
  }
} : {}

module.exports = {
  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '',

    mode: 'spa',
    router: {
      base: base_path
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
  ...routerBase,
  mode: 'spa',
  // router: {
  //   base: base_path
  // },
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
      { rel: 'icon', type: 'image/x-icon', href: (base_path + 'favicon.ico') },
      // { rel: 'icon', type: 'image/x-icon', href: ((process.env.NODE_ENV == 'development') ? '/' : '/blog/') + 'favicon.ico' },
      { rel: 'stylesheet', type: 'text/css', href: (base_path + 'vendor/nucleo/css/nucleo.css') },
      { rel: 'stylesheet', type: 'text/css', href: (base_path + 'vendor/font-awesome/css/font-awesome.css') },
      { rel: 'stylesheet', type: 'text/css', href: (base_path + 'vendor/cookie-run/css/cookierun-webfont.css') },
    ],
    script: [
      { src: 'https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js' }
    ],
  },
  base: base_path,
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  env: {
    HOME_PATH: base_path
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
    // '~/assets/vendor/nucleo/css/nucleo.css',
    // '~/assets/vendor/font-awesome/css/font-awesome.css',
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
    '@nuxtjs/axios',
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
