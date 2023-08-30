<template>
    <div class="flex justify-center">
        <div
            class="
                flex
                w-24
                h-15
                rounded-lg
                border
                m-3
                shadow-lg
                justify-center
                items-center
                flex-col
            "
            :key="kbd.label"
            v-for="kbd in keyboard_mappings"
        >
            <span class="text-2xl" v-html="kbd.label"></span>
            <p class="text-sm">{{ kbd.text }}</p>
        </div>
    </div>
</template>
<script>
export default {
    name: "KeysViz",
    props: ['keyboard_mappings'],
}
</script>