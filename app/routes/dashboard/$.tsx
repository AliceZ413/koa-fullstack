import { useNavigate } from '@remix-run/react';
import { Button, Result } from 'antd';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <Result
      status={404}
      title='404'
      subTitle='Page Not Found'
      extra={
        <Button
          type='primary'
          onClick={() => navigate('/dashboard')}
        >
          返回
        </Button>
      }
    ></Result>
  );
}
