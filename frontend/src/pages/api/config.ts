import { GlobalConfig } from '@/@types/global-config';
import { getAppConfig } from '@/configs/front.config';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GlobalConfig>
) {
  const data = getAppConfig(process.env)
  res.status(200).json(data);
}
