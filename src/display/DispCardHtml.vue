<template>
  <transition name="shrink">
    <!-- Grafik runtomkring osv -->
    <div
      class="font-inter h-[284px] border-t-2 border-black bg-white text-black flex justify-left items-center relative"
      v-show="show" 
    >
      <hr class="transition-all transform -translate-y-1/2 duration-500 absolute top-0 left-0 border-t-4 border-gray-800 opacity-20" :style="{width: progress*100 + '%'}">
      
      <div class="border-r-4 w-[515px] h-[80%] border-black text-right pr-8 my-8 pt-2">
          <!-- här e själva text-grejen -->
          <p class="uppercase text-[28px] ">{{  translation || "&nbsp;" }}</p>
          <!-- spacer -->
          <div class="mt-4 h-40 flex justify-center items-end flex-col">
            <p class="text-gray-700 font-rubik text-[38px]" v-html="formatted_book"></p>
            <p class="mt-2 text-gray-700 font-rubik text-[42px] tracking-widest" v-html="chapter_and_verse"></p>
</div>
      </div>
      <div
        class="leading-[3rem] tracking-[-1px] px-10 pt-5 pb-3 font-semibold dark:px-7 text-[42px] h-[10rem] overflow-auto w-[1340px]"
        id="curr_slide"
      >
        <p id="curr_slide_text" class="h-full flex justify-start items-center">
          {{ text }}
        </p>
      </div>
    </div>
  </transition>
</template>
<style>
.font-inter {
  font-family: "Inter", serif;
}
.font-rubik {
  font-family: 'Rubik Mono One', sans-serif;
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
export default {
    props: ['translation', 'book', 'chapter_and_verse', 'text', 'progress', 'show'],
    computed: {
        formatted_book() {
        // things like "Första Thessalonikerbrevet" are too long.
        // this substitution method makes sure all books fit

        let book = this.book
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
    }
}
</script>