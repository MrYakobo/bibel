import Vue from 'vue';
import Fullscreen from './Fullscreen.vue';
import 'virtual:windi.css'

new Vue({
    render: (h) => h(Fullscreen),
}).$mount('#fullscreen');