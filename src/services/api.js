import axios from 'axios';
import {STORE_TOKEN_ACCESS} from "../utils";
import AsyncStorage from '@react-native-async-storage/async-storage';

const defaultOptions = {
  baseURL: 'https://credfort.apps.roove.com.br/api/charges',
  timeout: 30000,
}

export function getApiAuth() {
  const instance = axios.create({
    ...defaultOptions,
    baseURL: 'https://credfort.apps.roove.com.br/api',
  });

  return instance;
}

export default async function getApi() {

  const accessToken = await AsyncStorage.getItem(STORE_TOKEN_ACCESS);

  const instance = axios.create({
    ...defaultOptions,
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    }
  });

  return instance;
}
