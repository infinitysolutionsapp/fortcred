import getApi from './api';

export default function registerExpense(box_id, category_id, amount, description, notes) {
  const promise = new Promise(async (resolve, reject) => {
    try {
      const payload = {
        operational_flow_id: box_id,
        category_id: category_id,
        amount: amount,
        description: description,
        notes: notes || '-'
      };

      const api = await getApi();
      const response = await api.post(`/register-expense/`, payload);
      resolve(response.data);
    } catch (error) {
      reject(error.response);
    }
  });

  return promise;
}
