<template>
  <transition name="shrink">
    <!-- Grafik runtomkring osv -->
    <div
      class="font-inter bg-black text-white text-center"
      v-show="show"
    >
        <p id="curr_slide_text" class="flex justify-end items-end my-20 w-[1720px] text-[64px] h-[30rem] leading-tight">
          {{ curr_slide.text }}
        </p>
      <div class="py-4 flex justify-center items-center bg-white text-black">
        <p class="w-[30rem] text-[60px] uppercase text-center">
          {{ curr_slide.translation || "&nbsp;" }}
        </p>
        <div class="border-black border-l-4 border-r-4 h-20 mx-10"></div>
        <div class="h-40 flex justify-center items-center flex-col">
          <p class="w-[40rem] font-rubik text-[46px]" v-html="book"></p>
          <p
            class="mt-2 font-rubik text-[46px] tracking-widest"
            v-html="chapter_and_verse"
          ></p>
        </div>
      </div>
      <!-- <p class="uppercase text-[28px] ">{{  curr_slide.translation || "&nbsp;" }}</p>
      
      <div class="border-r-4 w-[515px] h-[80%] text-right pr-8 my-8 pt-2">
          <div class="mt-4 h-40 flex justify-center items-end flex-col">
            <p class="text-gray-100 font-rubik text-[38px]" v-html="book"></p>
            <p class="mt-2 text-gray-100 font-rubik text-[42px] tracking-widest" v-html="chapter_and_verse"></p>
            </div>
      </div>
      <div
        class="leading-[3rem] tracking-[-1px] mx-10 mt-5 mb-3 font-semibold text-[42px] h-[10rem] overflow-auto w-[1340px]"
        id="curr_slide"
      >
        <p id="curr_slide_text" class="h-full flex justify-start items-center overflow-auto">
          {{ curr_slide.text }}
        </p>
      </div> -->
    </div>
  </transition>
</template>
<style>
.font-inter {
  font-family: "Inter", serif;
}
.font-rubik {
  font-family: "Rubik Mono One", sans-serif;
}
.bg-bare {
  background-image: url("/src/img/Bare Yellow.png");
  color: #885914 !important;
}
.bg-bare-black {
  background-image: url("/src/img/Bare.png");
  color: #fff !important;
}
@keyframes showtext {
  0% {
    /* max-width: 0; */
    /* letter-spacing: -15px; */
    /* filter: blur(100px); */
    opacity: 0;
  }
  100% {
    /* max-width: calc(1920px * 0.75); */
    /* letter-spacing: 0px; */
    /* transform: none; */
    opacity: 1;
  }
}

.shrink-enter-active {
  animation-name: showtext;
  animation-duration: 0.7s;
  animation-timing-function: ease;
}
.shrink-leave-active {
  animation-name: showtext;
  animation-duration: 1s;
  animation-timing-function: ease;
  animation-direction: reverse;
}
</style>
<script>
import { mapMutations, mapState, mapGetters } from "vuex"

export default {
  computed: {
    progress() {
      // no progress if invalid id
      if (!this.curr_slide.id.includes("_")) return 0

      const [id, counter, max_counter] = this.curr_slide.id.split("_")

      // no progress if we have exactly one slide
      if (max_counter == 1) return 0

      return counter / max_counter
    },
    ...mapState(["show"]),
    ...mapState(["words"]),
    ...mapGetters(["curr_slide"]),
    book() {
      // things like "Första Thessalonikerbrevet" are too long.
      // this substitution method makes sure all books fit

      let book = this.curr_slide.book
      const splitters = ["brevet", "gärningarna"]
      for (const splitter of splitters) {
        book = book.replace(splitter, `<wbr>${splitter}`)
      }

      const newline_splitters = ["Första", "Andra", "Tredje", "Fjärde", "Femte"]
      for (const splitter of newline_splitters) {
        book = book.replace(splitter, `${splitter}<br>`)
      }

      book = book.replace("Uppenbarelseboken", "Uppenbarelse<wbr>boken")

      book = book.replace("evangeliet", "")
      return book

      // return this.curr_slide.book.replace("evangeliet", "").replace("brevet", "<wbr>brevet")
    },
    chapter_and_verse() {
      return this.curr_slide.chapter_and_verse
    },
  },
  methods: {
    ...mapMutations(["init_state"]),
  },
  mounted() {
    this.init_state()
  },
}
</script>
