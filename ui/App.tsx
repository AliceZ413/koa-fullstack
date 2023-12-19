import { NMessageProvider } from 'naive-ui';
import { defineComponent } from 'vue';
import { RouterView } from 'vue-router';

export default defineComponent({
  name: 'App',
  setup() {
    return () => (
      <div>
        <NMessageProvider>
          <RouterView />
        </NMessageProvider>
      </div>
    );
  },
});
