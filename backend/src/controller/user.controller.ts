import { Request, Response } from 'express';
import { ICustomError } from '../extends/error';
import PasswordUtils from '../utils/password';
import AuthUtils from '../utils/auth';
import UserSvc from '../services/user.service';
import ResponseUtils from '../utils/response';
import { UserAttributes } from '../db/models/user.model';

async function fetchUser(r: Request, w: Response) {
  try {
    const data = await UserSvc.fetch();

    w.status(200).send(data);
  } catch (error) {
    const customError = error as ICustomError;
    return w
      .status(customError.status)
      .send(
        ResponseUtils.ResponseData(
          customError.status,
          customError.message,
          null,
          null
        )
      );
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
      .send(ResponseUtils.ResponseData(200, 'User login', null, user));
  } catch (error) {
    const customError = error as ICustomError;

    return w
      .status(customError.status)
      .send(
        ResponseUtils.ResponseData(
          customError.status,
          customError.message,
          null,
          null
        )
      );
  }
}

async function register(r: Request, w: Response) {
  try {
    const { password } = r.body;

    const hashedPassword = await PasswordUtils.PasswordHashing(password);

    r.body.password = hashedPassword;

    const data = await UserSvc.create(r.body);

    w.status(201).send(
      ResponseUtils.ResponseData(201, 'User Register', null, data)
    );
  } catch (error) {
    const customError = error as ICustomError;
    return w
      .status(customError.status)
      .send(
        ResponseUtils.ResponseData(
          customError.status,
          customError.message,
          null,
          null
        )
      );
  }
}

async function logout(r: Request, w: Response) {
  try {
    const token = r.cookies.token;
    if (!token) {
      return w
        .status(200)
        .send(ResponseUtils.ResponseData(200, 'User logout', null, null));
    }

    w.clearCookie('token');
    w.status(200).send(
      ResponseUtils.ResponseData(200, 'User logout', null, null)
    );
  } catch (error) {
    const customError = error as ICustomError;
    return w
      .status(customError.status)
      .send(
        ResponseUtils.ResponseData(
          customError.status,
          customError.message,
          null,
          null
        )
      );
  }
}

async function update(r: Request, w: Response) {
  try {
    const { username } = r.params;
    if (r.body.hasOwnProperty('password')) {
      w.status(400).send(
        ResponseUtils.ResponseData(
          400,
          'Password cannot be updated at this endpoint',
          null,
          null
        )
      );
      return;
    }

    if (r.body.hasOwnProperty('role')) {
      w.status(400).send(
        ResponseUtils.ResponseData(400, 'Role cannot be updated', null, null)
      );
      return;
    }

    const data = await UserSvc.update(username, r.body);

    w.status(200).send(
      ResponseUtils.ResponseData(200, 'User updated', null, data)
    );
  } catch (error) {
    const customError = error as ICustomError;
    return w
      .status(customError.status)
      .send(
        ResponseUtils.ResponseData(
          customError.status,
          customError.message,
          null,
          null
        )
      );
  }
}

async function remove(r: Request, w: Response) {
  try {
    const { username } = r.params;

    const data = await UserSvc.remove(username);

    w.status(200).send(
      ResponseUtils.ResponseData(200, 'User removed', null, data)
    );
  } catch (error: any) {
    const customError = error as ICustomError;
    return w
      .status(customError.status)
      .send(
        ResponseUtils.ResponseData(
          customError.status,
          customError.message,
          null,
          null
        )
      );
  }
}

export default { fetchUser, login, register, logout, update, remove };
