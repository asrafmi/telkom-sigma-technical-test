import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { backendRequest } from '@/infrastructure/backend-request';

type Data = {};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | { error: string }>
) {
  try {
    console.log('massook');

    // const { source } = req.body;
    const response = await backendRequest().get('/api/event');
    const data = response.data;

    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}
