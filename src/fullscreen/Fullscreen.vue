<template>
  <div class="w-full h-screen flex justify-center items-center overflow-hidden">
    <DispCard />
  </div>
</template>
<script>
import DispCard from '../display/DispCardFullscreen.vue'

export default {
    name: 'Disp',
    components: { DispCard },
}
</script>