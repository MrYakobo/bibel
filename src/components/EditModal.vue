<template>
    <div class="w-screen h-screen fixed left-0 top-0">
        <div class="absolute bg-black/70 inset-0 z-0" @click="close"></div>
        <div
            class="
                w-256
                px-16
                py-8
                relative
                mx-auto
                my-15
                rounded-xl
                shadow-xl
                bg-gray-200
            "
        >
            <p class="text-xl mb-2 font-bold text-gray-800">Översättning</p>
            <input type="text" v-model="edit_slide.translation" :class="input_text_classes" placeholder="sfb15" />

            <p class="text-xl mb-2 font-bold text-gray-800">Bok</p>
            <input ref="reference_input" type="text" v-model="edit_slide.book" placeholder="Första moseboken" :class="input_text_classes" />

            <p class="text-xl mb-2 font-bold text-gray-800">Kapitel och vers</p>
            <input ref="reference_input" type="text" v-model="edit_slide.chapter_and_verse" placeholder="1:1-10" :class="input_text_classes" />

            <p class="text-xl mt-8 mb-2 font-bold text-gray-800">Bibeltext</p>
            <textarea
                class="text-2xl w-full h-64 p-4 shadow-lg rounded-md"
                v-model="edit_slide.text"
                placeholder="I begynnelsen skapade Gud himmel och jord..."
            ></textarea>

            <button
                @click="close"
                class="
                    block
                    mx-auto
                    uppercase
                    py-2
                    w-32
                    bg-green-600
                    hover:bg-green-700
                    mt-3
                    text-white
                    border-2 border-blue-100
                    shadow-lg
                    rounded-lg
                    font-bold
                    text-xl
                "
            >
                Ok
            </button>

            <button
                @click="close"
                class="
                    absolute
                    font-thin
                    right-4
                    top-4
                    w-6
                    h-6
                    leading-6
                    text-center text-gray-800
                    drop-shadow-lg
                    cursor-pointer
                    text-4xl
                "
            >
                ✕
            </button>
        </div>
    </div>
</template>
<script>
import { mapMutations, mapState } from 'vuex'
export default {
    data(){
        return {
            input_text_classes: `
                    w-full
                    italic
                    text-3xl
                    font-bold
                    block
                    mb-5
                    shadow-lg
                    rounded-md
                    p-5`
        }
    },
    name: 'EditModal',
    computed: {
        ...mapState(['edit_slide'])
    },
    methods: {
        ...mapMutations(['set_show_modal', 'write', 'write_words']),
        close() {
            // default value for reference
            this.edit_slide.reference = `${this.edit_slide.book} ${this.edit_slide.chapter_and_verse}`
            this.set_show_modal(false)
            this.write_words()
            this.write()
        }
    },
    mounted() {
        this.$refs.reference_input.focus()
        window.addEventListener("keydown", e => {
            if (e.key == "Escape") {
                this.set_show_modal(false)
            }
        })
    }
}
</script>