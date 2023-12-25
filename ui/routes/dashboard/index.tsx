import ky from 'ky';
import { defineComponent, onMounted } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'DashboardIndex',
  setup() {
    const router = useRouter();
    onMounted(() => {
      ky.get('/api/auth/protected')
        .json()
        .then((data) => {
          if ((data as { statusCode: number }).statusCode === 403) {
            router.replace('/login');
          }
        });
    });
    return () => <div>Dashboard/Index4</div>;
  },
});
