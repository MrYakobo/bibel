import Vue from 'vue';
import Disp from './Disp.vue';
import 'virtual:windi.css'

import store from '../store'

new Vue({
    render: (h) => h(Disp),
    store
}).$mount('#disp');