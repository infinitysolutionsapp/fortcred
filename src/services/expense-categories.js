import getApi from './api';

export default async function getExpenseCategories() {
  const promise = new Promise(async (resolve, reject) => {
    try {
      const api = await getApi();
      const response = await api.get(`/expense-categories/`);
      resolve(response.data);
    } catch (error) {
      reject(error.response);
    }
  });

  return await promise;
}
