import request from './request';

export interface ILoginParams {
  username: string;
  password: string;
}

export interface ILoginResult {
  code: number;
  message?: string;
  data?: unknown;
}

/** 登录接口 POST /api/login/account */
export async function login(body: ILoginParams, options?: { [key: string]: unknown }) {
  return request('auth/login', {
    method: 'post',
    json: {
      ...body,
    },
    ...(options || {}),
  }).json<ILoginResult>();
}
