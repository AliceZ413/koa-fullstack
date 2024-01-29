import { Button, Form, Input } from 'antd';
import styles from '../styles/login.module.css';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { apiLogin } from '../apis/user';

export default function LoginPage() {
  const onFinish = async (values: { username: string; password: string }) => {
    const res = await apiLogin({
      username: values.username,
      password: values.password,
    });
    if (res) {
      if (res.code === 0) {
        console.log(res.data);
      } else {
      }
    }
  };

  return (
    <div className={styles.page}>
      <Form
        onFinish={onFinish}
        className={styles.form}
      >
        <h2 style={{ textAlign: 'center' }}>ANTD ADMIN</h2>
        <Form.Item
          name='username'
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input prefix={<UserOutlined />} />
        </Form.Item>
        <Form.Item
          name='password'
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password prefix={<LockOutlined />} />
        </Form.Item>
        <Form.Item>
          <Button
            block
            htmlType='submit'
            type='primary'
          >
            Sign In
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
