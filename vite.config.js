const {
  resolve
} = require('path')
const {
  createVuePlugin
} = require('vite-plugin-vue2');

import WindiCSS from 'vite-plugin-windicss'

module.exports = {
  plugins: [createVuePlugin(), WindiCSS(), ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        display: resolve(__dirname, 'display/index.html'),
        fullscreen: resolve(__dirname, 'fullscreen/index.html')
      }
    }
  },
  assetsInclude: ["**/*.tsv"],
  test: {
    // enable jest-like global test APIs
    globals: true,
    // simulate DOM with happy-dom
    // (requires installing happy-dom as a peer dependency)
    environment: 'happy-dom'
  }

};