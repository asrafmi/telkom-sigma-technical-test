import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import ResponseUtils from './response';

dotenv.config();

const GenerateToken = (data: any): string => {
  const token = jwt.sign(data, process.env.JWT_TOKEN as string, {
    expiresIn: '1d',
  });

  return token;
};

const Authenticated = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authToken = req.headers['authorization'];
    const token = authToken && authToken.split(' ')[1];

    if (token === null) {
      return res
        .status(401)
        .send(ResponseUtils.ResponseData(401, 'Unauthorized', null, null));
    }

    const result = ExtractToken(token!);
    if (!result) {
      return res
        .status(401)
        .send(ResponseUtils.ResponseData(401, 'Unauthorized', null, null));
    }
    next();
  } catch (err: any) {
    return res.status(500).send(ResponseUtils.ResponseData(500, '', err, null));
  }
};

const ExtractToken = (token: string) => {
  const secretKey: string = process.env.JWT_TOKEN as string;

  let resData: any;

  const res = jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      resData = null;
    } else {
      resData = decoded;
    }
  });

  if (resData) {
    const result: any = resData;
    return result;
  }
  return null;
};

export default { GenerateToken, Authenticated };
