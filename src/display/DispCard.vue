<template>
    <transition name="shrink">
        <div
            class="
                h-full
                my-auto
                mx-auto
                rounded
                text-3xl text-black
                font-bold
                bg-white
                px-1
                py-2
                shadow-2xl
            "
            v-show="show"
        >
            <div class="h-full border-l-8 border-red-800 px-4 py-2 rounded">
                <div v-if="curr_slide">
                    <p class="text-4xl text-red-900 mb-4 font-bold">
                        {{ curr_slide.reference }}
                    </p>
                    <p class="leading-normal">
                        {{ curr_slide.text }}
                    </p>
                </div>
            </div>
        </div>
    </transition>
</template>
<style>
@keyframes showtext {
    0% {
        transform: scaleX(0) scaleY(0);
    }
    100% {
        transform: none;
    }
}
.shrink-enter-active {
    animation-name: showtext;
    animation-duration: 0.8s;
    animation-timing-function: ease;
}
.shrink-leave-active {
    animation-name: showtext;
    animation-duration: 1s;
    animation-timing-function: ease;
    animation-direction: reverse;
    animation-delay: 0.1s;
}
</style>
<script>
export default {
    name: 'DispCard',
    data() {
        return {
            curr_slide: {
                reference: "",
                text: "",
            },
            show: false
        }
    },
    methods: {
        update_loop() {
            let base = import.meta.env.VITE_API_URL
            fetch(`${base}/slide.json`).then(a => a.json()).then(a => {
                this.curr_slide = a.slide
                this.show = a.show
            }).catch(e => {
                console.log(e)
            }).finally(() => {
                setTimeout(this.update_loop, 500)
            })
        }
    },
    mounted() {
        this.update_loop()
    }
}
</script>