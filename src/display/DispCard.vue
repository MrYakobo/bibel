<template>
  <transition name="shrink">
    <div
      class="font-nice w-[47rem] h-[23rem] my-auto mx-auto text-3xl text-white bg-contain bg-center bg-bare dark:shadow-none overflow-hidden dark:bg-transparent dark:text-white dark:text-4xl dark:h-auto"
      v-show="show"
    >
      <div class="h-full dark:border-transparent">
        <div v-show="curr_slide">
          <p
            class="my-5 text-3xl text-center dark:text-blue-500 dark:uppercase dark:tracking-widest dark:text-5xl dark:leading-loose mb-4 font-bold"
          >
            {{ curr_slide.reference }}
          </p>
          <div
            class="flex justify-center items-center px-10 py-7 h-[17rem] overflow-hidden"
          >
            <!-- mt-11 mx-11 h-[13rem]  -->
            <p
              ref="text"
              class="leading-[1.2] font-semibold dark:px-7 text-[28px] overflow-hidden"
            >
              {{ curr_slide.text }}
            </p>
          </div>
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
