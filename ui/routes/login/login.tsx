import { defineComponent, reactive, ref } from 'vue';

import styles from './login.module.scss';
import {
  FormInst,
  FormRules,
  NButton,
  NForm,
  NFormItem,
  NInput,
  useMessage,
} from 'naive-ui';
import { ILoginParams, login } from '../../utils/apis';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'Login',
  setup() {
    const loginFormModel = reactive<ILoginParams>({
      username: '',
      password: '',
    });
    const loading = ref<boolean>(false);
    const loginFormRef = ref<FormInst | null>(null);
    const message = useMessage();
    const router = useRouter();

    const loginFormRules: FormRules = {
      username: { required: true, message: '请输入用户名', trigger: 'blur' },
      password: { required: true, message: '请输入用户名', trigger: 'blur' },
    };

    const handleLogin = () => {
      loginFormRef.value?.validate((errors) => {
        if (!errors) {
          loading.value = true;
          login({
            username: loginFormModel.username,
            password: loginFormModel.password,
          })
            .then((res) => {
              console.log(res);
              if (res.code === 0) {
                router.push('/dashboard');
              } else {
                message.error(res.message);
              }
            })
            .catch((err) => {
              message.error('请求出错，请重试');
            })
            .finally(() => {
              loading.value = false;
            });
        }
      });
    };

    return () => (
      <>
        <div class={styles['login-container']}>
          <div class={styles['login-card']}>
            {/* TODO Logo */}
            <div class={styles['title']}>logo img</div>

            <div class={styles['content']}>
              <NForm
                ref={loginFormRef}
                model={loginFormModel}
                rules={loginFormRules}
              >
                <NFormItem path='username'>
                  <NInput
                    value={loginFormModel.username}
                    placeholder={'用户名'}
                    type='text'
                    size='large'
                    onUpdateValue={(value) => (loginFormModel.username = value)}
                  />
                </NFormItem>
                <NFormItem path='password'>
                  <NInput
                    value={loginFormModel.password}
                    placeholder={'密码'}
                    type='password'
                    size='large'
                    onUpdateValue={(value) => (loginFormModel.password = value)}
                  />
                </NFormItem>
                <NFormItem>
                  <NButton
                    type='primary'
                    size='large'
                    loading={loading.value}
                    block
                    onClick={handleLogin}
                  >
                    登 录
                  </NButton>
                </NFormItem>
              </NForm>
            </div>
          </div>
        </div>
      </>
    );
  },
});

{
  /* 
        <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" @keyup.enter="handleLogin">
          <el-form-item prop="username">
            <el-input
              v-model.trim="loginForm.username"
              placeholder="用户名"
              type="text"
              tabindex="1"
              :prefix-icon="User"
              size="large"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model.trim="loginForm.password"
              placeholder="密码"
              type="password"
              tabindex="2"
              :prefix-icon="Lock"
              size="large"
              show-password
            />
          </el-form-item>
          <el-form-item prop="code">
            <el-input
              v-model.trim="loginForm.code"
              placeholder="验证码"
              type="text"
              tabindex="3"
              :prefix-icon="Key"
              maxlength="7"
              size="large"
            >
              <template #append>
                <el-image :src="codeUrl" @click="createCode" draggable="false">
                  <template #placeholder>
                    <el-icon><Picture /></el-icon>
                  </template>
                  <template #error>
                    <el-icon><Loading /></el-icon>
                  </template>
                </el-image>
              </template>
            </el-input>
          </el-form-item>
          <el-button :loading="loading" type="primary" size="large" @click.prevent="handleLogin"> 登 录 </el-button>
        </el-form>
      </div>
    </div>
  </div> */
}
