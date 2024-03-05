import Validator from 'validatorjs';
import { Request, Response, NextFunction } from 'express';

const CreateValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, description, date, location } = req.body;

    const data = {
      name,
      description,
      date,
      location,
    };

    const rules: Validator.Rules = {
      name: 'required|string|max:50',
      description: 'required|string|max:200',
      date: 'required|string',
      location: 'required|string|max:50',
    };

    const validate = new Validator(data, rules);

    if (validate.fails()) {
      console.log('masok sini ajg');

      return res.status(400).send({ status: 400, message: validate.errors });
    }
    next();
  } catch (error: any) {
    return res
      .status(500)
      .send({ status: 500, message: 'InternalServerError' });
  }
};

// TODO: Add more validation for update and delete

export default { CreateValidation };
