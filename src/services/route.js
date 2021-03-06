import getApi from './api';

export async function getUnchargedClients() {
  const promise = new Promise(async (resolve, reject) => {
    try {
      const api = await getApi();
      const response = await api.get('/uncharged-clients/');

      resolve(response.data);
    } catch (error) {
      reject(error.response);
    }
  });

  return await promise;
}

export default async function getClientsInRoute() {

  console.log('getClientsInRoute');

  const promise = new Promise(async (resolve, reject) => {
    try {
      const api = await getApi();
      const response = await api.get('/clients-in-route/');

      resolve(response.data);
    } catch (error) {
      reject(error.response);
    }
  });

  return await promise;
}
