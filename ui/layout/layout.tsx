import { defineComponent } from 'vue';

import styles from './layouts.module.scss';
import Sidebar from './sidebar';
import { NLayout, NLayoutContent, NLayoutHeader, NSpace } from 'naive-ui';

export default defineComponent({
  name: 'layout',
  setup() {
    return () => (
      <NLayout
        hasSider
        contentStyle={{
          width: '100%',
          height: '100vh',
        }}
      >
        <Sidebar />
        <NLayout>
          <NLayoutHeader>Header</NLayoutHeader>
          <NLayoutContent>layout</NLayoutContent>
        </NLayout>
      </NLayout>
      //   <div class={styles['app-wrapper']}>
      //     <Sidebar class={styles['sidebar-container']} />
      //     <div>layout</div>
      //   </div>
    );
  },
});
