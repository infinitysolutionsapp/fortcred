import axios from 'axios';
import {STORE_TOKEN_ACCESS, STORE_TOKEN_REFRESH} from '../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';

const defaultOptions = {
  baseURL: 'https://credfort.infinitysolutionsapp.com/api/charges',
  timeout: 30000,
};

const baseUrl = 'https://credfort.infinitysolutionsapp.com/api';

export function getApiAuth() {
  const instance = axios.create({
    ...defaultOptions,
    baseURL: baseUrl,
  });

  return instance;
}

export default async function getApi() {
  const accessToken = await AsyncStorage.getItem(STORE_TOKEN_ACCESS);

  const instance = axios.create({
    ...defaultOptions,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  instance.interceptors.response.use(
    response => response,
    err => {
      return new Promise(async (resolve, reject) => {
        const originalReq = err.config;

        if (
          err.response.status === 401 &&
          err.config &&
          !err.config.__isRetryRequest
        ) {
          originalReq._retry = true;
          const token = await AsyncStorage.getItem(STORE_TOKEN_ACCESS);
          const refreshToken = await AsyncStorage.getItem(STORE_TOKEN_REFRESH);
          const payload = {
            token,
            refresh: refreshToken,
          };

          const res = axios
            .post(`${baseUrl}/token/refresh/`, payload, {
              headers: {
                'Content-Type': 'application/json',
                Authorization: token,
              },
            })
            .then(async res => {
              const {data} = res;
              const accessToken = data.access;
              await AsyncStorage.multiSet([[STORE_TOKEN_ACCESS, accessToken]]);

              originalReq.headers.Authorization = `Bearer ${accessToken}`;

              return axios(originalReq);
            })
            .catch(error => {
              Alert.alert('Sua sessão expirou! Realize login novamente!');
              AsyncStorage.clear().then();
            });

          resolve(res);
        }

        return reject(err.response);
      });
    },
  );

  return instance;
}
