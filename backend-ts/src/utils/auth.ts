import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const GenerateToken = (data: any): string => {
  console.log('aswwwww', process.env.JWT_TOKEN);
  console.log('dataaaa', data.dataValues);
  
  const token = jwt.sign(data, process.env.JWT_TOKEN as string, {
    expiresIn: '20s',
  });
  console.log('token', token);

  return token;
};

export default { GenerateToken };
