import { MenuOption, NLayoutSider, NMenu } from 'naive-ui';
import { defineComponent, ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';

import styles from './sidebar.module.scss';

const SidebarLogo = defineComponent({
  name: 'SidebarLogo',
  setup() {
    return () => (
      <div class={styles['sidebar-header']}>
        <RouterLink to='/dashboard' key='expand'>
          <div>Dashboard</div>
        </RouterLink>
      </div>
    );
  },
});

const SidebarMenuItem = defineComponent({
  name: 'SidebarMenuItem',
  props: {
    to: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      require: true,
    },
  },
  setup(props) {
    return () => <RouterLink to={props.to}>{props.title}</RouterLink>;
  },
});

const Sidebar = defineComponent({
  name: 'sidebar',
  setup() {
    const router = useRouter();
    const allRoutes = router.getRoutes();
    allRoutes.map((item) => {
      console.log(item);
      return {
        key: item.path,
      } as MenuOption;
    });

    const menuOptions: MenuOption[] = [
      {
        key: '/dashboard',
        label: () => <SidebarMenuItem to='/dashboard' title='Dashboard' />,
      },
    ];

    return () => (
      <NLayoutSider width={240} showTrigger='arrow-circle' bordered>
        <SidebarLogo />
        <NMenu options={menuOptions} />
      </NLayoutSider>
    );
  },
});

export default Sidebar;
