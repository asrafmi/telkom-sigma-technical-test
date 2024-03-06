import { request } from './request';

export const backendRequest = (token: string = null) => {
  return request({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
