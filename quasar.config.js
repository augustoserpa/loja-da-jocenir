// Configuration for your app
// https://v2.quasar.dev/quasar-cli-vite/quasar-config-file

import { defineConfig } from '#q-app/wrappers'
import path from 'path'

export default defineConfig((/* ctx */) => {
  return {
    boot: ['axios'],

    css: [],

    extras: ['roboto-font', 'material-icons'],

    build: {
      target: {
        browser: ['es2022', 'firefox115', 'chrome115', 'safari14'],
        node: 'node20',
      },

      vueRouterMode: 'hash',

      alias: {
        components: path.resolve(__dirname, './src/components'),
        layouts: path.resolve(__dirname, './src/layouts'),
        pages: path.resolve(__dirname, './src/pages'),
        router: path.resolve(__dirname, './src/router'),
        stores: path.resolve(__dirname, './src/stores'),
        composables: path.resolve(__dirname, './src/composables'),
        assets: path.resolve(__dirname, './src/assets'),
        css: path.resolve(__dirname, './src/css'),
      },

      vitePlugins: [
        [
          'vite-plugin-checker',
          {
            eslint: {
              lintCommand: 'eslint -c ./eslint.config.js "./src*/**/*.{js,mjs,cjs,vue}"',
              useFlatConfig: true,
            },
          },
          { server: false },
        ],
      ],
    },

    devServer: {
      open: true,
    },

    framework: {
      config: {},
      plugins: [],
    },

    animations: [],

    ssr: {
      prodPort: 3000,
      middlewares: ['render'],
      pwa: false,
    },

    pwa: {
      workboxMode: 'GenerateSW',
    },

    cordova: {},

    capacitor: {
      hideSplashscreen: true,
    },

    electron: {
      preloadScripts: ['electron-preload'],
      inspectPort: 5858,
      bundler: 'packager',
      builder: {
        appId: 'loja-da-jocenir',
      },
    },

    bex: {
      extraScripts: [],
    },
  }
})
