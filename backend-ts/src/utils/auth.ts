import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const GenerateToken = (data: any): string => {
  const token = jwt.sign(data, process.env.JWT_TOKEN as string, {
    expiresIn: '1h',
  });

  return token;
};

export default { GenerateToken };
