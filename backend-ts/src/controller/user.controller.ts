import { Request, Response } from 'express';
import { ICustomError } from '../extends/error';
import PasswordUtils from '../utils/password';
import AuthUtils from '../utils/auth';
import UserSvc from '../services/user.service';
import { UserAttributes } from '../db/models/user.model';

async function fetchUser(r: Request, w: Response) {
  try {
    const data = await UserSvc.fetch();
    w.status(200).send(data);
  } catch (error) {
    const customError = error as ICustomError;
    return w.status(customError.status).send(customError.message);
  }
}

async function login(r: Request, w: Response) {
  try {
    const user = await UserSvc.login(r.body);
    console.log('user', user);

    const token = AuthUtils.GenerateToken(user.dataValues);
    console.log('token', token);
    return w.status(200).send({ token });
  } catch (error) {
    console.log('error', error);

    const customError = error as ICustomError;
    return w
      .status(customError.status)
      .send({ message: customError.message, status: customError.status });
  }
}

async function register(r: Request, w: Response) {
  try {
    const { password } = r.body;
    const hashedPassword = await PasswordUtils.PasswordHashing(password);
    r.body.password = hashedPassword;
    const data = await UserSvc.create(r.body);
    w.status(200).send(data);
  } catch (error) {
    const customError = error as ICustomError;
    return w
      .status(customError.status)
      .send({ message: customError.message, status: customError.status });
  }
}

export default { fetchUser, login, register };
