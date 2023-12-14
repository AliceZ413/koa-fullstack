<template>
  <div>
    Index.vue
    <n-button>Click Me</n-button>

    <!-- <form></form> -->
  </div>
</template>

<script setup lang="ts">
import { NButton } from 'naive-ui';
import { ref } from 'vue';
const username = ref('');

// fetch('/api/login', {
//   method: 'POST',
// })
//   .then((res) => {})
//   .catch(() => null);
</script>

<style scoped></style>
