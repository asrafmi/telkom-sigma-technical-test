import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { backendRequest } from '@/infrastructure/backend-request';
import to from 'await-to-js';
import { ErrorProps } from '@/types/error';

type Data = {};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | { error: string }>
) {
  try {
    const [err, response] = await to(
      backendRequest().post('/api/user/login', req.body)
    );
    if (err) {
      throw err;
    }

    const data = response.data;

    res.status(200).json(data);
  } catch (error) {
    const customError = error as ErrorProps;
    res.status(customError.response.data.status).send({
      message: customError.response.data.message,
      status: customError.response.data.status,
      errors: customError.response.data.errors
        ? customError.response.data.errors.errors
        : null,
    });
  }
}
