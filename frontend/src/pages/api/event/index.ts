import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { backendRequest } from '@/infrastructure/backend-request';
import to from 'await-to-js';

type Data = {};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | { error: string }>
) {
  try {
    const [err, response] = await to(backendRequest().get('/api/event'));
    if (err) {
      throw err;
    }

    const data = response.data;

    res.status(200).json(data);
  } catch (error) {
    res.status(error.response.data.status).send({
      message: error.response.data.message,
      status: error.response.data.status,
      errors: error.response.data.errors
        ? error.response.data.errors.errors
        : null,
    });
  }
}
