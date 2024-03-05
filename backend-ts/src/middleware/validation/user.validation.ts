import Validator from 'validatorjs';
import { Request, Response, NextFunction } from 'express';

const RegisterValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, email, password, fullname, role } = req.body;

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
      return res.status(400).send({ status: 400, message: validate.errors });
    }
    next();
  } catch (error: any) {
    return res
      .status(500)
      .send({ status: 500, message: 'InternalServerError' });
  }
};

export default { RegisterValidation };
