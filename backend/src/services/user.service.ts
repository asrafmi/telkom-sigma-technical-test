import { Op } from 'sequelize';
import User, { UserAttributes } from '../db/models/user.model';
import {
  ConflictError,
  HttpNotFound,
  ICustomError,
  MySqlError,
} from '../extends/error';
import Utils from '../utils/password';

async function fetch() {
  try {
    const user = await User.findAll({});
    return user;
  } catch (error) {
    const customError = error as ICustomError;
    throw new MySqlError(customError.message);
  }
}

async function login(body: Pick<UserAttributes, 'username' | 'password'>) {
  try {
    const user = await User.findAll({
      where: {
        [Op.or]: [{ username: body.username }, { email: body.username }],
      },
    });

    if (user.length === 0) {
      throw new HttpNotFound('Wrong username/password!');
    }

    const matched = await Utils.PasswordCompare(
      body.password,
      user[0].password
    );
    if (!matched) {
      throw new HttpNotFound('Wrong username/password!');
    }

    return user[0];
  } catch (error) {
    const customError = error as ICustomError;
    throw customError.status
      ? customError
      : new MySqlError(customError.message);
  }
}

async function create(body: Omit<UserAttributes, 'id'>) {
  try {
    const findUser = await User.findAll({
      where: {
        [Op.or]: [{ username: body.username }, { email: body.email }],
      },
    });
    if (findUser.length) {
      throw new ConflictError('Username or email already exists!');
    }
    const user = await User.create(body);
    return user;
  } catch (error) {
    const customError = error as ICustomError;
    throw customError.status
      ? customError
      : new MySqlError(customError.message);
  }
}

async function update(username: string, body: Partial<UserAttributes>) {
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      throw new HttpNotFound('User not found!');
    }

    const update = await User.update(body, { where: { username } });
    return update;
  } catch (error) {
    const customError = error as ICustomError;
    throw customError.status
      ? customError
      : new MySqlError(customError.message);
  }
}

async function remove(username: string) {
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      throw new HttpNotFound('User not found!');
    }

    const remove = await User.destroy({ where: { username } });

    return remove;
  } catch (error: any) {
    const customError = error as ICustomError;
    throw customError.status
      ? customError
      : new MySqlError(customError.message);
  }
}

export default { fetch, login, create, update, remove };
