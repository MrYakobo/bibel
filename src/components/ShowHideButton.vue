<template>
    <button
        :class="[
            'uppercase w-6/12 h-12 p-2 border-2 border-blue-100 shadow-lg rounded font-bold text-xl',
            showhide_class,
        ]"
        @click="show_hide"
    >
        {{ showhide_label }}
    </button>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
    methods: {
        ...mapMutations(['inc', 'dec', 'show_hide'])
    },
    computed: {
        ...mapState(['show']),
        showhide_label() {
            return this.show ? 'Showing' : 'Hiding'
        },
        showhide_class() {
            if (this.show)
                return "bg-blue-700 hover:bg-blue-800 text-white"

            return "bg-white hover:bg-blue-100 text-gray-800"
        }
    }
}
</script>