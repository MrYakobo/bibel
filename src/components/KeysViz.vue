<template>
    <div class="flex justify-center">
        <div class="flex w-64 h-15 rounded-lg border m-3 shadow-lg justify-center items-center flex-col">
            <a class="text-blue-600 hover:text-blue-500 hover:underline font-bold" href="/fullscreen">Fullscreen display</a>
            <a class="text-blue-600 hover:text-blue-500 hover:underline font-bold" href="/display">Lower thirds display</a>
        </div>
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
        <div class="flex w-64 h-15 rounded-lg border m-3 shadow-lg justify-center items-center flex-col" v-if="git_version && debug">
            {{ git_version }}
        </div>
    </div>
</template>
<script>
export default {
    name: "KeysViz",
    props: ['keyboard_mappings'],
    data() {
        return {
            debug: location.search.includes("debug"),
        }
    },
    computed: {
        git_version(){
            let c = import.meta.env.VITE_COMMIT_DATE
            if (c)
                return c

            return "git version"
        }
    }
}
</script>