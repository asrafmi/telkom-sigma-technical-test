import axios, { AxiosRequestConfig } from 'axios';

export const request = (conf: AxiosRequestConfig = {}) => {
  const axiosRequest = axios.create({ ...conf });
  return axiosRequest;
};
