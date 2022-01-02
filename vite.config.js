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
        display: resolve(__dirname, 'display/index.html')
      }
    }
  }

};