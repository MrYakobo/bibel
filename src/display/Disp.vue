<template>
    <div class="w-fhd h-64 fixed bottom-12 overflow-hidden">
        <DispCard class="w-9/12" />
    </div>
</template>
<script>
import DispCard from './DispCard.vue'

export default {
    name: 'Disp',
    components: { DispCard },
}
</script>