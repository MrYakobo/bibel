<template>
    <transition name="shrink">
        <div
            class="
                h-64
                my-auto
                mx-auto
                rounded
                text-3xl text-black
                font-bold
                bg-white
                px-1
                py-2
                shadow-2xl
                dark:shadow-none
                overflow-hidden
                dark:bg-transparent dark:text-white dark:text-4xl dark:h-auto
            "
            v-show="show"
        >
            <div
                class="
                    h-full
                    border-l-8 border-red-800
                    dark:border-transparent
                    px-4
                    py-2
                    rounded
                "
            >
                <div v-show="curr_slide">
                    <p
                        class="
                            text-4xl text-red-900
                            dark:text-blue-500
                            dark:uppercase
                            dark:tracking-widest
                            dark:text-5xl
                            dark:leading-loose
                            mb-4
                            font-bold
                        "
                    >
                        {{ curr_slide.reference }}
                    </p>
                    <p class="leading-normal dark:px-7">
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

/* @keyframes showtext {
    0% {
        clip-path: path(
            "M0 -0.12C8.33 -8.46 16.67 -12.62 25 -12.62C37.5 -12.62 35.91 0.15 50 -0.12C64.09 -0.4 62.5 -34.5 75 -34.5C87.5 -34.5 87.17 -4.45 100 -0.12C112.83 4.2 112.71 -17.95 125 -18.28C137.29 -18.62 137.76 1.54 150.48 -0.12C163.19 -1.79 162.16 -25.12 174.54 -25.12C182.79 -25.12 191.28 -16.79 200 -0.12L200 -34.37L0 -34.37L0 -0.12Z"
        );
    }
    100% {
        clip-path: path(
            "M0 199.88C8.33 270.71 16.67 306.13 25 306.13C37.5 306.13 35.91 231.4 50 231.13C64.09 230.85 62.5 284.25 75 284.25C87.5 284.25 87.17 208.05 100 212.38C112.83 216.7 112.71 300.8 125 300.47C137.29 300.13 137.76 239.04 150.48 237.38C163.19 235.71 162.16 293.63 174.54 293.63C182.79 293.63 191.28 262.38 200 199.88L200 0.13L0 0.13L0 199.88Z"
        );
    }
} */

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
    /* animation-delay: 0.1s; */
}
</style>
<script>
import {mapMutations, mapState, mapGetters} from 'vuex'
export default {
    name: 'DispCard',
    computed: {
        ...mapState(["is_writing", "show"]),
        ...mapGetters(["curr_slide"])
    },
    methods: {
        update_loop() {
            if (this.is_writing) {
                // wait until writing is done
                console.log("writing, skipping reading this round...")
                setTimeout(this.update_loop, 100)
                return
            }

            let base = import.meta.env.VITE_API_URL
        },
        ...mapMutations(["set_read_ping"])
    },
    mounted() {
        this.update_loop()
    }
}
</script>