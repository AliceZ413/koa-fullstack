<script setup lang="ts">
defineProps(['is404'])
</script>

<template>
  <div v-if="is404">404 Page Not Found</div>
  <div v-else>500 Internal Error</div>
</template>

<style scoped>

</style>
