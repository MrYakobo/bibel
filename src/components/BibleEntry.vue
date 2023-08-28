<template>
    <div class="">
        <DispCard id="hidden_dispcard" class="absolute invisible pointer-events-none" />
        <div class="flex my-4 justify-center items-end text-xl">
            <div class="mx-1">
                <p>Version</p>
                <select
                    class="
                        text-center text-black
                        bg-white
                        shadow
                        p-2
                        rounded
                        border border-gray-300
                    "
                    v-model="selected_translation"
                >
                    <option
                        :key="translation"
                        v-for="translation in translations"
                    >
                        {{ translation }}
                    </option>
                </select>
            </div>
            <div class="mx-1">
                <p>Bok</p>
                <select
                    class="
                        text-black
                        bg-white
                        shadow
                        p-2
                        rounded
                        border border-gray-300
                    "
                    v-model="selected_book"
                >
                    <option :key="book" v-for="book in longbooks">
                        {{ book }}
                    </option>
                </select>
            </div>
            <div :class="['mx-1', disabled_if(!selected_book)]">
                <p>Kapitel</p>
                <input
                    class="
                        bg-white
                        text-black
                        shadow
                        px-3
                        py-2
                        w-20
                        rounded
                        border border-gray-300
                    "
                    type="number"
                    min="1"
                    :max="num_chapters"
                    :disabled="!selected_book"
                    v-model="selected_chapter"
                    :placeholder="chapter_placeholder"
                />
            </div>
            <div :class="[disabled_if(!selected_chapter), 'mx-1']">
                <p>Vers(er)</p>
                <input
                    :disabled="!selected_chapter"
                    class="
                        text-black
                        bg-white
                        px-4
                        py-2
                        w-20
                        rounded
                        border border-gray-300
                    "
                    type="text"
                    v-model="selected_verses"
                    :placeholder="verse_placeholder"
                    @keydown.enter="submit"
                />
            </div>
        </div>
        <div class="text-center">
            <p
                class="
                    p-3
                    w-128
                    h-32
                    bg-white
                    mx-auto
                    shadow-md
                    overflow-y-scroll
                "
            >
                {{ bible_text }}
            </p>
        </div>
        <button
            @click="submit"
            :disabled="!selected_verses"
            :class="[
                disabled_if(!selected_verses),
                'block mx-auto mt-4 bg-green-700 hover:bg-green-900 text-white rounded h-10 px-4 shadow-md text-xl',
            ]"
        >
            Importera bibelord
        </button>
    </div>
</template>
<script>
import { mapGetters, mapState, mapMutations } from 'vuex'
import pick from 'lodash.pick'
import {paginate, paginate_new} from '../paginate'
import DispCard from '../display/DispCard.vue'

function titleCase(str) {
    str = str.toLowerCase().split(" ")
    for (var i = 0; i < str.length; i++) {
        str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1)
    }
    return str.join(" ")
}
function range(start, end) {
    // https://stackoverflow.com/a/33457557/
    return Array(end - start + 1).fill().map((_, idx) => start + idx)
}
function versetxt_to_lst(txt) {
    // 1-4 => [1,2,3,4]
    // 1 => [1]
    let parts = txt.split("-")
    if (parts.length == 1 || parts[1] == "")
        return parts

    try {
        let [lo, hi] = parts.map(a => parseInt(a))
        return range(lo, hi)
    }
    catch (e) {
        // parseint error or RangeError, it's cool man
    }
}

const PAGINATE_MAXLEN = 280

export default {
    name: 'BibleEntry',
    data() {
        return {
            curr_sfb: "sfb15",
            selected_book: "Första Moseboken",
            selected_chapter: "1",
            selected_verses: "1-10"
        }
    },
    computed: {
        ...mapGetters(['longbooks', 'bibledb', 'translations']),
        selected_translation: {
            get() {
                return this.$store.state.selected_translation
            },
            set(value) {
                this.$store.commit('set_selected_translation', value)
            }
        },
        chapters() {
            let t = this.bibledb[this.selected_book]
            if (t == null)
                return []

            return Object.keys(t)
        },
        num_chapters() {
            return this.chapters.length
        },
        chapter_placeholder() {
            // show range for the chapter input field
            if (this.chapters.length == 0)
                return ""
            return this.chapters.length
        },
        verse_placeholder() {
            if (this.selected_chapter == "")
                return ""
            // show range for the verse input field
            let t = this.bibledb[this.selected_book]
            if (t == null)
                return ""

            let verses = t[this.selected_chapter]
            if (verses == null)
                return ""

            return `1-${Object.keys(verses).length}`
        },
        bible_text() {
            if (!(this.selected_book && this.selected_chapter && this.selected_verses))
                return ""

            let chapter = this.bibledb[this.selected_book][this.selected_chapter]
            let verses = versetxt_to_lst(this.selected_verses)

            let selection = Object.values(pick(chapter, verses))
            return selection.join(" ")
        },
        bible_reference() {
            if (!(this.selected_book && this.selected_chapter && this.selected_verses))
                return ""
            return `${this.selected_book} ${this.selected_chapter}:${this.selected_verses}`
        }
    },
    methods: {
        ...mapMutations(['add_bible_slides']),
        disabled_if(bool) {
            return {
                'opacity-50 pointer-events-none cursor-not-allowed':
                    bool,
            }
        },
        reset_form() {
            this.selected_book = ""
            this.selected_chapter = ""
            this.selected_verses = ""
        },
        submit() {
            let slides = this.split_bible_slides(this.bible_reference, this.bible_text)
            this.add_bible_slides(slides)
            this.reset_form()
        },
        split_bible_slides(original_ref, original_text) {
            var arr = paginate_new(original_text, "#hidden_dispcard #curr_slide", "#hidden_dispcard #curr_slide_text")
            return arr.map((s, i) => {
                var o = {
                    reference: original_ref,
                    text: s
                }
                return o
            })
        },
    },
    components: { DispCard }
}
</script>