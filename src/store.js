import Vue from 'vue'
import Vuex from 'vuex'

import { join_channel, write } from './db'


function make_form_data(data, field_id, filename) {
    var form_data = new FormData();
    const blob = new Blob([data], { type: 'text/plain' })
    form_data.append(field_id, blob, filename);
    return form_data
}

// we want the updates to call the store mutations
let channel = join_channel(() => { }, ({ payload }) => {
    console.log("GOT PAYLOAD", payload)
    let i = payload.i
    let show = payload.show
    let words = payload.words

    if (i != null)
        store.commit("set_i_without_write", i)
    if (show != null)
        store.commit("set_show_without_write", show)
    if (words != null)
        store.commit("set_words_without_write", words)
})

Vue.use(Vuex)


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
        base: import.meta.env.VITE_API_URL,
        write_ping: null,
        read_ping: null,
        is_writing: false,
        channel
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
        init_state(state) {
            // this is used as the store for configured words, not the current slide
            fetch(`${state.base}/bibel.json`).then(a => a.json()).then(t => {
                this.commit('set_words_without_write', t.words || [])
                this.commit('set_show_without_write', t.show ?? true) // if null, default to true

                // we need to fetch the current slide to set i correctly
                fetch(`${state.base}/slide.json`).then(a => a.json()).then(a => {
                    try {
                        let curr_slide = a.slide
                        let curr_i = t.words.findIndex(w => w.id == curr_slide.id)
                        this.commit('set_i_without_write', curr_i)
                    } catch (e) {
                        // some error with data format, just ignore it
                        console.log("some error with data format")
                        console.error(e)
                    }

                }).catch(e =>
                    console.error(e)
                )
            }).catch(e =>
                console.error(e)
            )
        },
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
            this.commit('write_words')
            this.commit('write')
        },
        write_words(state) {
            write(channel, { words: state.words })
        },
        set_show(state, show) {
            state.show = show
            this.commit('write_show')
            this.commit("write")
        },
        set_i_without_write(state, i) {
            state.i = i
        },
        set_show_without_write(state, show) {
            state.show = show
        },
        set_words_without_write(state, words) {
            state.words = words
        },
        set_i(state, i) {
            state.i = i
            this.commit('write_i')
            this.commit("write")
        },
        write_i(state) {
            write(channel, { i: state.i })
        },
        write_show(state) {
            write(channel, { show: state.show })
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

            if (state.is_writing) {
                console.log("is already writing, trying again in 50ms...")
                setTimeout(this.write, 50)
                return
            }

            let start = window.performance.now()

            let slide = state.words[state.i]
            let show = state.show
            let words = state.words

            let promises = []

            state.is_writing = true

            promises.push(
                fetch(`${state.base}`, {
                    method: 'POST',
                    body: make_form_data(JSON.stringify({ slide, show }), "f", "slide.json")
                })
            )
            promises.push(
                fetch(`${state.base}`, {
                    method: 'POST',
                    body: make_form_data(JSON.stringify({ words, show }), "f", "bibel.json")
                })
            )
            Promise.all(promises).then(() => {
                let end = window.performance.now()
                let time = end - start
                state.write_ping = time
                state.is_writing = false
            })
        },
        set_read_ping(state, time) {
            state.read_ping = time
        },
        inc(state) {
            this.commit('set_i', Math.min(state.i + 1, state.words.length - 1))
        },
        dec(state) {
            this.commit('set_i', Math.max(state.i - 1, 0))
        },
        show_hide(state) {
            state.show = !state.show
            this.commit('write_show')
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

            this.commit('write_words')
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
            this.commit('write_words')
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
            this.commit('write_words')
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
            this.commit('write_words')
            this.commit('write')
        },
        remove_curr_word(state) {
            this.commit('remove_word_at_index', state.i)
        }
    }
})
export default store