//centeralized API setup

import axios from 'axios';
import qs from 'qs';

const configuredApiUrl = import.meta.env.VITE_API_URL?.replace(/\/+$/, '');
const apiBaseUrl = configuredApiUrl ? `${configuredApiUrl}/api` : '/api';

export const axiosInstance = axios.create({
    baseURL: apiBaseUrl,
    withCredentials: true,
    paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat' }),
})

