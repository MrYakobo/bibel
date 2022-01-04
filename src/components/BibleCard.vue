<template>
    <div class="h-40 relative w-128 handle" @click="$emit('click')">
        <h1 class="italic text-lg font-bold">
            {{ reference || "Tomt kort" }}
        </h1>
        <p class="text-sm">{{ text || "&nbsp;" }}</p>
        <button
            @click.stop="$emit('edit')"
            class="
                absolute
                font-thin
                right-10
                top-2
                w-6
                h-6
                leading-6
                text-center
                rounded-full
                text-white
                bg-black/50
                hover:bg-yellow-500
                cursor-pointer
            "
        >
            ✎
        </button>
        <button
            @click.stop="$emit('delete')"
            class="
                absolute
                font-thin
                right-3
                top-2
                w-6
                h-6
                leading-6
                text-center
                rounded-full
                text-white
                bg-black/50
                hover:bg-red-600
                cursor-pointer
            "
        >
            ✕
        </button>
    </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
    name: 'BibleCard',
    props: ['reference', 'text'],
    computed: {
        ...mapState(['words'])
    }
}
</script>