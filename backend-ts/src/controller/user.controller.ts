import { Request, Response } from 'express';
import { ICustomError } from '../extends/error';
import PasswordUtils from '../utils/password';
import AuthUtils from '../utils/auth';
import UserSvc from '../services/user.service';
import Utils from '../utils/response';
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

    const token = AuthUtils.GenerateToken(user.dataValues);

    w.cookie('token', token, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    user.dataValues.token = token;

    return w
      .status(200)
      .send(Utils.ResponseData(200, 'User login', null, user));
  } catch (error) {
    const customError = error as ICustomError;

    return w
      .status(customError.status)
      .send(
        Utils.ResponseData(customError.status, customError.message, null, null)
      );
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

async function logout(r: Request, w: Response) {
  try {
    const token = r.cookies.token;
    if (!token) {
      return w
        .status(200)
        .send(Utils.ResponseData(200, 'User logout', null, null));
    }

    w.clearCookie('token');
    w.status(200).send(Utils.ResponseData(200, 'User logout', null, null));
  } catch (error) {
    const customError = error as ICustomError;
    return w
      .status(customError.status)
      .send({ message: customError.message, status: customError.status });
  }
}

export default { fetchUser, login, register, logout };
