import getApi, { getApiAuth } from './api';

export default function registerCharge(box_id, charge_id, amount, action, notes) {
  const promise = new Promise(async (resolve, reject) => {
    try {
      const payload = {
        operational_flow_id: box_id,
        charge_id: charge_id,
        amount: amount,
        diff_action: action,
        notes: notes || '-'
      };

      const api = await getApi();
      const response = await api.post(`/register-charge/`, payload);
      resolve(response.data);
    } catch (error) {
      reject(error.response);
    }
  });

  return promise;
}
