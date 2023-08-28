<template>
    <div class="h-screen p-5">
        <div
            :class="[
                'h-11/12 overflow-y-scroll relative shadow bg-gray-100 p-3 rounded-md',
                { 'opacity-70': !show },
            ]"
        >
            <p
                v-if="words.length == 0"
                class="text-gray-500 my-5 w-128 mx-6 text-center text-xl"
            >
                Lägg till bibelord med plusknappen eller bibelimporten
            </p>
            <draggable v-else handle=".handle" v-model="words" @change="change">
                <transition-group name="list" class="w-128 flex flex-col mx-6">
                    <BibleCard
                        v-for="(w, wi) in words"
                        :ref="w.id"
                        :key="w.id"
                        @click="set_active_slide(wi)"
                        @delete="remove_word_at_index(wi)"
                        @edit="open_edit(wi)"
                        :class="[
                            card_class(wi),
                            'border-2 border-gray-300 p-3 rounded inline-block my-1 mx-1 cursor-default',
                        ]"
                        :reference="w.reference"
                        :text="w.text"
                    />
                </transition-group>
            </draggable>
        </div>
        <div class="mt-2 flex justify-center items-center px-4">
            <button
                class="
                    w-6/12
                    h-12
                    bg-white
                    border
                    shadow-lg
                    text-green-500 text-3xl
                    font-bold
                    rounded-lg
                    hover:bg-green-500 hover:text-white
                    border-gray-300
                    transition-colors
                    duration-75
                "
                @click="$emit('add_new')"
            >
                &plus;
            </button>
            <ShowHideButton />
        </div>
    </div>
</template>
<style>
/* .list-move {
    transition: 0.3s;
} */
.sortable-chosen {
    outline: 2px solid #1e40af !important;
}
</style>
<script>
import draggable from 'vuedraggable'
import { mapState, mapMutations } from 'vuex'
import BibleCard from './BibleCard.vue'
import ShowHideButton from './ShowHideButton.vue'

export default {
    name: 'BibleCards',
    components: { draggable, BibleCard, ShowHideButton },
    computed: {
        words: {
            get() {
                return this.$store.state.words
            },
            set(value) {
                this.$store.commit('set_words', value)
                // we have reordered here, so we need to set i to the correct value
            }
        },
        ...mapState(['i', 'show']),
    },
    methods: {
        ...mapMutations(['remove_word_at_index', 'set_i', 'edit_slide']),
        open_edit(wi) {
            this.edit_slide(this.words[wi])
        },
        change(e) {
            if (this.i == e.moved.oldIndex)
                this.set_i(e.moved.newIndex)
            else if (this.i == e.moved.newIndex)
                this.set_i(e.moved.oldIndex)
        },
        card_class(wi) {
            if (this.is_active(wi))
                return 'bg-blue-800 text-white'

            if (this.is_in_multigroup(wi))
                return 'bg-yellow-50'

            if (this.words[wi].reference == "")
                return "bg-white"

            return 'bg-yellow-50 text-black'
        },
        is_active(wi) {
            return this.i == wi
        },
        set_active_slide(wi) {
            this.set_i(wi)
        },
        is_in_multigroup(wi) {
            // if the id has "_" in it, it's in a group
            return this.words[wi].id.includes("_")
        },
        differs(wi) {
            return wi > 1 && this.words[wi - 1].reference != this.words[wi].reference
        },
    }
}
</script>