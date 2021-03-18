import getApi from './api';
import _ from 'lodash';

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
  const promise = new Promise(async (resolve, reject) => {
    try {
      const api = await getApi();
      const response = await api.get('/clients-in-route/');

      const items = _.sortBy(response.data, (item)=> {
        return item.client.name;
      });

      resolve(items);
    } catch (error) {
      reject(error.response);
    }
  });

  return await promise;
}
