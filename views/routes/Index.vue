<template>
  <div>
    Index.vue
    <n-button @click="handleLogout">Logout</n-button>

    <!-- <form></form> -->
  </div>
</template>

<script setup lang="ts">
import { NButton } from 'naive-ui';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

function handleLogout() {
  fetch('/api/logout', {
    method: 'post',
  })
    .then((res) => res.json())
    .then(() => {
      router.replace('/login');
    })
    .catch((err) => null);
}

// fetch('/api/login', {
//   method: 'POST',
// })
//   .then((res) => {})
//   .catch(() => null);
</script>

<style scoped></style>
