<template>
  <div>
    <div class="text-3xl font-bold text-center mt-50" v-if="!inited">
      Laddar adminpanelen...
    </div>
    <div class="flex" v-else>
      <BibleCards @add_new="add_new_empty_word_and_scroll" />
      <div class="p-5 flex flex-col justify-start">
        <KeysViz class="w-full shadow" :keyboard_mappings="keyboard_mappings" />
        <BibleEntry class="w-full shadow-md p-6 my-6" />
        <div class="zoom-50 bg-gray-500 rounded-lg py-10 mt-auto mb-8">
          <div class="w-fhd h-[20rem]">
            <DispCard />
          </div>
        </div>
      </div>
      <EditModal v-if="show_modal" />
    </div>
  </div>
</template>
<style>
.zoom-50 {
  zoom: 60%;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.1s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
<script>
import { mapGetters, mapMutations, mapState } from "vuex";
import BibleEntry from "./components/BibleEntry.vue";
import BibleCards from "./components/BibleCards.vue";
import EditModal from "./components/EditModal.vue";
import KeysViz from "./components/KeysViz.vue";

import DispCard from "./display/DispCard.vue";

function bibletsv_to_lookuptable(txt) {
  /*
        plain text to lookup table
        the data file looks like this:
        Första Moseboken	1 Mos	1	1	1	I begynnelsen skapade Gud himmel och jord.

        the columns are book_name, book_abbr, book_num, chapter_num, verse_num, verse
        the lookup table (js object) looks like this:
        {
            "Första Moseboken": {
                "1": {
                    "1": "I begynnelsen skapade Gud himmel och jord."
                }
            }
        }
        which makes lookup of verses trivial
    */
  let obj = {};
  let lines = txt.split("\n");
  for (let line of lines) {
    if (line == "") continue;

    let [book_name, book_abbr, book_num, chapter_num, verse_num, verse] =
      line.split("\t");
    obj[book_name] = obj[book_name] || {};
    obj[book_name][chapter_num] = obj[book_name][chapter_num] || {};
    obj[book_name][chapter_num][verse_num] = verse;
  }
  return obj;
}

export default {
  name: "Admin",
  components: { BibleEntry, BibleCards, EditModal, DispCard, KeysViz },
  data() {
    return {
      keyboard_mappings: {
        ArrowDown: {
          label: "&darr;",
          text: "Next slide",
          action: () => {
            this.inc();
            this.scroll_curr_into_view();
          },
        },
        ArrowUp: {
          label: "&uarr;",
          text: "Prev slide",
          action: () => {
            this.dec();
            this.scroll_curr_into_view();
          },
        },
        Delete: {
          label: "Del",
          text: "Delete slide",
          action: this.remove_curr_word,
        },
        a: {
          label: "a",
          text: "Add slide",
          action: this.add_new_empty_word_and_scroll,
        },
        h: {
          label: "h",
          text: "Show / Hide",
          action: this.show_hide,
        },
        e: {
          label: "e",
          text: "Edit slide",
          action: this.edit_curr_slide,
        },
      },
    };
  },
  methods: {
    ...mapMutations([
      "set_words",
      "set_show",
      "set_i",
      "set_inited",
      "set_bibledb",
      "inc",
      "dec",
      "remove_curr_word",
      "add_new_empty_word",
      "show_hide",
      "edit_curr_slide",
      "set_show_modal",
      "edit_slide",
      "init_state",
    ]),
    add_new_empty_word_and_scroll() {
      this.add_new_empty_word();
      let id = this.counter_id;
      this.scroll_into_view(id);

      let slide = this.words.find((w) => w.id == id);
      this.edit_slide(slide);
    },
    scroll_into_view(id) {
      this.$nextTick(() => {
        let refs = this.$children
          .map((a) => a.$refs)
          .find((a) => Object.keys(a).length > 0);
        // console.log(refs, id, refs[id])
        let ref = refs[id][0];
        ref.$el.scrollIntoViewIfNeeded(false);
      });
    },
    scroll_curr_into_view() {
      let id = this.curr_slide.id;
      this.scroll_into_view(id);
    },
  },
  computed: {
    ...mapState(["show_modal", "counter_id", "words", "inited", "base"]),
    ...mapGetters(["curr_slide"]),
  },
  mounted() {
    document.onkeydown = (e) => {
      let inTextField =
        e.target.tagName == "INPUT" ||
        e.target.tagName == "TEXTAREA" ||
        e.target.tagName == "SELECT";
      if (inTextField) return;

      let kbd = this.keyboard_mappings[e.key];
      if (kbd == null) return;

      let func = kbd.action;
      if (func == null) return;

      func();
      e.preventDefault();

      if (e.key.includes("Arrow")) {
        // disable scrolling with arrow keys
        return false;
      }
    };

    let promises = [];

    let translations = ["sfb15", "sfb98", "b2000"];
    let base = this.base;

    for (let translation of translations) {
      let promise = fetch(`${base}/${translation}.tsv`)
        .then((a) => a.text())
        .then((t) => {
          let db = bibletsv_to_lookuptable(t);
          this.set_bibledb({ db, translation });
        });
      promises.push(promise);
    }

    this.init_state();
    Promise.all(promises).finally(() => {
      console.log("inited all promises");
      this.set_inited(true);
    });
  },
};
</script>
