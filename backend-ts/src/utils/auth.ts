import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const GenerateToken = (data: any): string => {
  const token = jwt.sign(data, process.env.JWT_TOKEN as string, {
    expiresIn: '1d',
  });

  return token;
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

export default { GenerateToken, ExtractToken };
