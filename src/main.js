import Vue from 'vue';
import App from './App.vue';
import 'virtual:windi.css'
import Vuex from 'vuex'

Vue.use(Vuex)

function make_form_data(data, field_id, filename) {
    var form_data = new FormData();
    const blob = new Blob([data], { type: 'text/plain' })
    form_data.append(field_id, blob, filename);
    return form_data
}

const store = new Vuex.Store({
    state: {
        words: [],
        counter_id: "initial-id",
        i: 0,
        show: true,
        inited: false,
        bibles: {
            sfb98: {},
            sfb15: {},
            b2000: {}
        },
        show_modal: false,
        edit_slide: {},
        selected_translation: "sfb15",
        base: import.meta.env.VITE_API_URL
    },
    getters: {
        longbooks(state, getters) {
            return Object.keys(getters.bibledb)
        },
        bibledb(state) {
            return state.bibles[state.selected_translation]
        },
        translations(state) {
            return Object.keys(state.bibles)
        },
        curr_slide(state) {
            return state.words[state.i]
        }
    },
    mutations: {
        edit_slide(state, slide) {
            this.commit('set_edit_slide', slide)
            this.commit('set_show_modal', true)
        },
        edit_curr_slide(state, getters) {
            this.commit('edit_slide', state.words[state.i])
        },
        generate_new_id(state) {
            state.counter_id = Math.random().toString(36).substring(2, 8)
        },
        set_show_modal(state, b) {
            state.show_modal = b
        },
        set_edit_slide(state, slide) {
            state.edit_slide = slide
        },
        set_selected_translation(state, t) {
            state.selected_translation = t
        },
        set_inited(state, bool) {
            state.inited = bool
        },
        set_words(state, words) {
            state.words = words
            this.commit('write')
        },
        set_show(state, show) {
            state.show = show
            this.commit('write')
        },
        set_i(state, i) {
            state.i = i
            this.commit('write')
        },
        set_bibledb(state, {
            db,
            translation
        }) {
            state.bibles[translation] = db
        },
        write(state) {
            if (!state.inited)
                return

            let slide = state.words[state.i]
            let show = state.show

            let promises = []

            var obj = {
                slide,
                show
            }
            promises.push(
                fetch(`${state.base}`, {
                    method: 'POST',
                    body: make_form_data(JSON.stringify(obj), "f", "slide.json")
                })
            )
            obj = {
                words: state.words,
                show: state.show
            }
            promises.push(
                fetch(`${state.base}`, {
                    method: 'POST',
                    body: make_form_data(JSON.stringify(obj), "f", "bibel.json")
                })
            )
            Promise.all(promises)
            console.log('writing')
        },
        inc(state) {
            this.commit('set_i', Math.min(state.i + 1, state.words.length - 1))
        },
        dec(state) {
            this.commit('set_i', Math.max(state.i - 1, 0))
        },
        show_hide(state) {
            state.show = !state.show
            this.commit('write')
        },
        remove_word_at_index(state, di) {
            state.words.splice(di, 1)
            /*
            decrement i if i is after the deletion
                Example di < i. i = 1, di = 3 
                [foo, curr, bar, to_delete] => [foo, curr, bar]
                [0, 1, 2, 3] => [0, 1, 2]
                curr^           curr^

                Example di > i. i = 3, di = 1
                [foo, to_delete, bar, curr] ==> [foo, bar, curr]
                [0, 1, 2, 3] => [0, 1, 2]
                      curr^        curr^

                Example di = i. i = 1, di = 1
                [foo, to_delete/curr, bar] ==> [foo, curr]
                [0, 1, 2] => [0, 1]
                curr^        curr^
            */

            if (di < state.i)
                state.i = Math.min(state.i + 1, state.words.length - 1)

            let maxvalue = state.words.length - 1
            let value = state.i
            let minvalue = 0

            let clamped = Math.min(Math.max(value, minvalue), maxvalue)
            state.i = clamped

            this.commit('write')
        },
        add_new_word(state, obj) {
            this.commit('generate_new_id')
            let id = state.counter_id

            state.words.push({
                id,
                ...obj
            })
            // var newi = state.words.length - 1
            // state.i = newi
            this.commit('write')
        },
        add_bible_slides(state, slides) {
            // this mutation imports a batch of bible slides
            // because they are related, the ID field is set to the group

            this.commit('generate_new_id')
            let group_id = state.counter_id

            for (const [i, slide] of slides.entries()) {
                let id = group_id + "_" + i
                state.words.push({
                    id,
                    ...slide
                })
            }
            this.commit('write')
        },
        add_new_empty_word(state) {
            this.commit('generate_new_id')
            let id = state.counter_id

            state.words.splice(state.words.length, 0, {
                reference: "",
                text: "",
                id
            })
            // var newi = state.words.length - 1
            // state.i = newi
            this.commit('write')
        },
        remove_curr_word(state) {
            this.commit('remove_word_at_index', state.i)
        }
    }
})

new Vue({
    render: (h) => h(App),
    store
}).$mount('#app');