import { defineComponent, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { authProtected } from '../../utils/apis';

export default defineComponent({
  name: 'DashboardIndex',
  setup() {
    const router = useRouter();
    onMounted(() => {
      authProtected().then((res) => {
        console.log(res);
      });
    });
    return () => <div>Dashboard/Index5</div>;
  },
});
