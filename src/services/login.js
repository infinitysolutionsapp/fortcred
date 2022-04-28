import {getApiAuth} from './api';

export default function login(username, password) {
  const promise = new Promise(async (resolve, reject) => {
    try {
      const dataAccount = {
        username,
        password,
      };

      const response = await getApiAuth().post('/token/', dataAccount);
      resolve(response.data);
    } catch (error) {
      reject(error.response);
    }
  });

  return promise;
}
