import ky, { type Options } from 'ky';

const defaultOptions: Options = {
  prefixUrl: '/api',
  hooks: {
    beforeError: [
      (error) => {
        const { response } = error;
        if (response?.body) {
          console.log(response.body);
        }
        return error;
      },
    ],
  },
};

const request = ky.create(defaultOptions);

export default request;
