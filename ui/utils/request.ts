import ky, { type Options } from 'ky';

const defaultOptions: Options = {
  prefixUrl: '/api',
};

const request = ky.create(defaultOptions);

export default request;
