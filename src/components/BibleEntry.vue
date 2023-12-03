<template>
    <div class="">
        <DispCard id="hidden_dispcard" class="!absolute invisible pointer-events-none" />
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
        <!-- TODO: selektiv screenshot.
            Lägg den i lower thirds by default; så att man inte behöver lägga på effekter i kdenlive
            Ladda ner som zip ?
        -->
        <button v-if="debug" @click="screenshot">Screenshot all</button>
        <button v-if="debug" class="block mx-auto mt-4 bg-green-700 hover:bg-green-900 text-white rounded h-10 px-4 shadow-md text-xl" @click="import_one_from_each_book" >Töm och ta en från varje bok</button>
        <a href="" id="a" class="hidden"></a>
    </div>
</template>
<script>
import { mapGetters, mapState, mapMutations } from 'vuex'
import pick from 'lodash.pick'
import {paginate, paginate_new} from '../paginate'
import DispCard from '../display/DispCard.vue'

import html2canvas from 'html2canvas'

function download(canvas, filename) {
  const data = canvas.toDataURL("image/png;base64");
  const a = document.getElementById("a")
  a.download = filename
  a.href = data
  a.click()
}

async function screenshot(i){
    let disp = document.getElementById("dispcard")
    let now = new Date().toISOString().split("T")[0]
    let filename = `bibelord_${now}_${i}`
    let c = await html2canvas(disp, {})
    await download(c, filename)
}

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
            debug: location.search.includes("debug"),
            curr_sfb: "sfb15",
            selected_book: "Första Moseboken",
            selected_chapter: "1",
            selected_verses: "1-10"
        }
    },
    computed: {
        ...mapState(['words']),
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
        ...mapMutations(["set_i_without_write"]),
        async screenshot(){
            async function processWords() {
                for (let i = 0; i < this.words.length; i++) {
                    this.set_i_without_write(i);

                    await new Promise(resolve => {
                        this.$nextTick(() => {
                            resolve()
                        })
                    })
                    console.log(i)

                    await screenshot(i)
                }
            }

            await processWords.call(this);
        },
        import_one_from_each_book(){
            // delete everything
            while (true) {
                this.remove_curr_word()
                if (this.words.length == 0) {
                    break
                }
            }

            // import one from each book
            for (const book of this.longbooks) {
                this.selected_book = book
                this.selected_chapter = "1"
                this.selected_verses = "1-2"
                this.submit()
            }
        },
        ...mapMutations(['add_bible_slides', 'remove_curr_word']),
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
            let book = this.selected_book
            let chapter_and_verse = `${this.selected_chapter}:${this.selected_verses}`
            let slides = this.split_bible_slides(this.bible_reference, {book, chapter_and_verse}, this.bible_text, this.selected_translation)
            this.add_bible_slides(slides)
            this.reset_form()
        },
        split_bible_slides(original_ref, {book, chapter_and_verse}, original_text, translation) {
            var arr = paginate_new(original_text, "#hidden_dispcard #curr_slide", "#hidden_dispcard #curr_slide_text")
            return arr.map((s, i) => {
                var o = {
                    reference: original_ref,
                    text: s,
                    translation: translation,
                    book,
                    chapter_and_verse
                }
                return o
            })
        },
    },
    components: { DispCard }
}
</script>