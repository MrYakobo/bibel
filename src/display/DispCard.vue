<template>
  <!-- this is a wrapper, so we can use dispcardhtml in tests with only props -->
  <DispCardHtml
    :translation="curr_slide.translation"
    :book="curr_slide.book"
    :chapter_and_verse="curr_slide.chapter_and_verse"
    :text="curr_slide.text"
    :progress="progress"
    :show="show"
  />
</template>
<script>
import { mapMutations, mapState, mapGetters } from "vuex";
import DispCardHtml from "./DispCardHtml.vue";

export default {
  name: "DispCard",
  components: {DispCardHtml},
  computed: {
    progress(){
      // no progress if invalid id
      if (!this.curr_slide.id.includes("_"))
        return 0

      const [id, counter, max_counter] = this.curr_slide.id.split("_")

      // no progress if we have exactly one slide
      if (max_counter == 1)
        return 0

      return counter/max_counter
    },
    ...mapState(["show"]),
    ...mapGetters(["curr_slide"]),
  },
  methods: {
    ...mapMutations(["init_state"]),
  },
  mounted() {
    this.init_state();
  },
}
</script>
