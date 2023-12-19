import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormText } from '@ant-design/pro-components';
import { createStyles } from 'antd-style';
import { LoginParams, login } from '../utils/apis';
import { HTTPError } from 'ky';

const useStyles = createStyles(({ token }) => {
  return {
    container: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
    },
  };
});

function Login() {
  const { styles } = useStyles();

  const handleSubmit = async (values: LoginParams) => {
    try {
      const result = await login(values);
      if (result.code === 0) {
        return;
      }
      console.log(result.message);
    } catch (err) {
      if (err instanceof HTTPError) {
        console.log(err);
      }
    }
  };

  return (
    <div className={styles.container}>
      <div style={{ flex: 1, padding: '32px 0' }}>
        <LoginForm
          title='Admin'
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
          }}
          onFinish={async (values) => {
            await handleSubmit(values as LoginParams);
          }}
        >
          <ProFormText
            name='username'
            fieldProps={{
              size: 'large',
              prefix: <UserOutlined className={'prefixIcon'} />,
            }}
            placeholder={'用户名'}
            rules={[
              {
                required: true,
                message: '请输入用户名!',
              },
            ]}
          />
          <ProFormText.Password
            name='password'
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined className={'prefixIcon'} />,
            }}
            placeholder={'密码'}
            rules={[
              {
                required: true,
                message: '请输入密码',
              },
            ]}
          />
        </LoginForm>
      </div>
    </div>
  );
}

export default Login;
