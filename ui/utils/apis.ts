import ky from 'ky';

export interface ILoginParams {
  username: string;
  password: string;
}

export interface ILoginResult {
  code: number;
  message?: string;
  data?: any;
}

/** 登录接口 POST /api/login/account */
export async function login(
  body: ILoginParams,
  options?: { [key: string]: any }
) {
  return ky('/api/auth/login', {
    method: 'post',
    json: {
      ...body,
    },
    ...(options || {}),
  }).json<ILoginResult>();
}
