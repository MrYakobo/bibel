<template>
    <div class="overflow-hidden h-full grid bg-gray-900 text-center">
        <DispCard class="w-9/12 m-auto" />
    </div>
</template>
<script>
import DispCard from '../display/DispCard.vue'

export default {
    name: 'Disp',
    components: { DispCard },
}
</script>