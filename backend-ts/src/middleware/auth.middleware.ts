import { NextFunction, Request, Response } from 'express';
import ResponseUtils from '../utils/response';
import AuthUtils from '../utils/auth';

const Authenticated = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authToken = req.headers['authorization'];
    const token = authToken && authToken.split(' ')[1];

    if (token === null) {
      return res
        .status(401)
        .send(ResponseUtils.ResponseData(401, 'Unauthorized', null, null));
    }

    const result = AuthUtils.ExtractToken(token!);
    if (!result) {
      return res
        .status(401)
        .send(ResponseUtils.ResponseData(401, 'Unauthorized', null, null));
    }
    res.locals.userRole = result.role;
    res.locals.username = result.username;
    next();
  } catch (err: any) {
    return res.status(500).send(ResponseUtils.ResponseData(500, '', err, null));
  }
};

const AdminRole = (req: Request, res: Response, next: NextFunction) => {
  try {
    const roleId = res.locals.userRole;
    if (roleId !== 'admin') {
      return res
        .status(401)
        .send(ResponseUtils.ResponseData(403, 'Forbidden', null, null));
    }

    next();
  } catch (err: any) {
    return res.status(500).send(ResponseUtils.ResponseData(500, '', err, null));
  }
};

export default { Authenticated, AdminRole };
