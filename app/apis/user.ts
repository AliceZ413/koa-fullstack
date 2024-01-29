import { ofetch } from 'ofetch';
import { ResponseResult } from '../../types/request';
import { LoginResult } from '../../types/user/login';

export const apiLogin = (data: { username: string; password: string }) => {
  return ofetch<ResponseResult<LoginResult>>('/api/user/login', {
    method: 'post',
    body: {
      ...data,
    },
    headers: {
      'Content-Type': 'application/json;',
    },
  });
};

export const apiLogout = () => {
  return ofetch<ResponseResult<unknown>>('/api/user/logout', {
    method: 'post',
  });
};
