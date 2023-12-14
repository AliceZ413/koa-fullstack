<template>
  <div>Login.vue</div>
  <n-form :model="model">
    <n-form-item
      path="username"
      label="username"
    >
      <n-input
        type="text"
        v-model:value="model.username"
      ></n-input>
    </n-form-item>
    <n-form-item
      path="password"
      label="密码"
    >
      <n-input
        v-model:value="model.password"
        type="password"
        @keydown.enter.prevent
      />
    </n-form-item>
    <n-button
      round
      type="primary"
      @click="handleValidateButtonClick"
    >
      验证
    </n-button>
  </n-form>
</template>

<script setup lang="ts">
import { NButton, NForm, NFormItem, NInput } from 'naive-ui';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const model = ref({
  username: '',
  password: '',
});

function handleValidateButtonClick() {
  fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(model.value),
  })
    .then((res) => res.json())
    .then((data) => {
      router.push('/');
    })
    .catch(() => null);
}
// fetch('/api/login', {
//   method: 'POST',
// })
//   .then((res) => {})
//   .catch(() => null);
</script>

<style scoped></style>
