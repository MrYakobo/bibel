import Vue from 'vue';
import Disp from './Disp.vue';
import 'virtual:windi.css'

new Vue({
    render: (h) => h(Disp),
}).$mount('#disp');