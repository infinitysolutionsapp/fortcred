import getApi from './api';

export default async function startOperationalFlow() {
  const promise = new Promise(async (resolve, reject) => {
    try {
      const api = await getApi();
      const response = await api.get(`/obtain-operational-flow/`);

      console.log('response.data', response.data);

      resolve(response.data);
    } catch (error) {
      reject(error.response);
    }
  });

  return await promise;
}

export function finishOperationalFlow(box_id, code) {
  const promise = new Promise(async (resolve, reject) => {
    try {
      const payload = {
        operational_flow_id: box_id,
        finish_code: code,
      };

      const api = await getApi();
      const response = await api.post(`/finish-operational-flow/`, payload);
      resolve(response.data);
    } catch (error) {
      reject(error.response);
    }
  });

  return promise;
}
