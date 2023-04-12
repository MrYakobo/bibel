import Vue from 'vue';
import Fullscreen from './Fullscreen.vue';
import 'virtual:windi.css'

import store from '../store'

new Vue({
    render: (h) => h(Fullscreen),
    store
}).$mount('#fullscreen');