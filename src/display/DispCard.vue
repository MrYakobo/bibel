<template>
  <transition name="shrink">
    <!-- Grafik runtomkring osv -->
    <div
      class="font-nice w-[47rem] h-[23rem] my-auto mx-auto text-3xl text-white bg-contain bg-center bg-bare-black dark:shadow-none dark:bg-transparent dark:text-white dark:text-4xl dark:h-auto"
      v-show="show" 
    >
      <div class="h-[23rem] dark:border-transparent overflow-auto">
        <!-- här e själva text-grejen -->
          <p
            class="my-5 text-4xl text-center dark:text-blue-500 dark:uppercase dark:tracking-widest dark:text-5xl dark:leading-loose mb-4 font-bold"
          >
            {{ curr_slide.reference }}
          </p>
            <div
              class="leading-[1.1] px-10 pt-5 pb-3 font-semibold dark:px-7 text-[40px] h-[15rem] overflow-auto text-center"
              id="curr_slide"
            >
              <p id="curr_slide_text" class="h-full flex justify-center items-center hyphens-auto">
                {{ curr_slide.text }}
              </p>
            </div>
      </div>
    </div>
  </transition>
</template>
<style>
.font-nice {
  font-family: "Inter", serif;
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
import { mapMutations, mapState, mapGetters } from "vuex";

export default {
  name: "DispCard",
  computed: {
    ...mapState(["show"]),
    ...mapGetters(["curr_slide"]),
  },
  methods: {
    ...mapMutations(["init_state"]),
  },
  mounted() {
    this.init_state();
  },
};
</script>
