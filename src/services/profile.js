import getApi from './api';

export default async function getProfile() {

  console.log('getProfile getProfile');

  const promise = new Promise(async (resolve, reject) => {
    try {
      const api = await getApi();
      const response = await api.get('/me/');

      resolve(response.data);
    } catch (error) {
      reject(error.response);
    }
  });

  return await promise;
}
