<template>
  <div>
    <nav>
      <ul>
        <li>
          <router-link to="/">/</router-link>
        </li>
        <li>
          <router-link to="/about">about</router-link>
        </li>
      </ul>
    </nav>
    <main>
      <div>{{ count }}</div>
      <button @click="handleClick">click me</button>
      <RouterView />
    </main>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
export default defineComponent({
  name: 'App',
  setup() {
    const count = ref(0);
    const handleClick = () => {
      count.value++;
    };
    return {
      count,
      handleClick,
    };
  },
});
</script>
