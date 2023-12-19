import ky from 'ky';

export interface LoginParams {
  username: string;
  password: string;
}

export interface LoginResult {
  code: number;
  message?: string;
  data?: any;
}

/** 登录接口 POST /api/login/account */
export async function login(
  body: LoginParams,
  options?: { [key: string]: any }
) {
  return ky('/api/auth/login', {
    method: 'post',
    json: {
      ...body,
    },
    ...(options || {}),
  }).json<LoginResult>();
}
