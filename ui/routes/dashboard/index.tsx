import { authProtected } from '../../utils/apis';
import { defineComponent, onMounted } from 'vue';
import { useRouter } from 'vue-router';

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
