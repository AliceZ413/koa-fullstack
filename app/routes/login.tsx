import { Button, Form, Input, Typography } from 'antd';
import styles from '../styles/login.module.css';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { apiLogin } from '../apis/user';
import { useNavigate } from '@remix-run/react';
import { useState } from 'react';

export default function LoginPage() {
  const navigate = useNavigate();
  const [alert, setAlert] = useState('');
  const onFinish = async (values: { username: string; password: string }) => {
    const res = await apiLogin({
      username: values.username,
      password: values.password,
    });
    if (res) {
      if (res.code === 0) {
        navigate('/dashboard/home');
      } else {
        setAlert(res.msg);
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
          {alert ? (
            <Typography.Text type='danger'>{alert}</Typography.Text>
          ) : null}
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
