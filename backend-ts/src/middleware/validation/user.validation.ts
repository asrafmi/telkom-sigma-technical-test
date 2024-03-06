import Validator from 'validatorjs';
import { Request, Response, NextFunction } from 'express';
import ResponseUtils from '../../utils/response';

const RegisterValidation = async (r: Request, w: Response, n: NextFunction) => {
  try {
    const { username, email, password, fullname, role } = r.body;

    const data = {
      username,
      email,
      password,
      fullname,
      role,
    };

    const rules: Validator.Rules = {
      username: 'required|string|max:20',
      email: 'required|email',
      password: 'required|min:7',
      fullname: 'required|string|max:50',
      role: 'required|string|in:admin,user',
    };

    const validate = new Validator(data, rules);

    if (validate.fails()) {
      return w
        .status(400)
        .send(
          ResponseUtils.ResponseData(400, 'Bad Request', validate.errors, null)
        );
    }
    n();
  } catch (error: any) {
    return w
      .status(500)
      .send(ResponseUtils.ResponseData(500, error.message, null, null));
  }
};

const UpdateValidation = async (r: Request, w: Response, n: NextFunction) => {
  try {
    const { username, email, fullname } = r.body;
    const data = {
      username,
      email,
      fullname,
    };

    const rules: Validator.Rules = {
      username: 'string|max:20',
      email: 'email',
      fullname: 'string|max:50',
    };

    const validate = new Validator(data, rules);

    if (validate.fails()) {
      return w
        .status(400)
        .send(
          ResponseUtils.ResponseData(400, 'Bad Request', validate.errors, null)
        );
    }
    n();
  } catch (error: any) {
    return w
      .status(500)
      .send(ResponseUtils.ResponseData(500, error.message, null, null));
  }
};

export default { RegisterValidation, UpdateValidation };
