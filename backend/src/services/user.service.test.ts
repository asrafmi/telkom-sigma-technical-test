import User from '../db/models/user.model';
import Utils from '../utils/password';
import { ConflictError, HttpNotFound, MySqlError } from '../extends/error';
import UserSvc from './user.service';
import { Op } from 'sequelize';

jest.mock('../db/models/user.model');
jest.mock('../utils/password');

describe('login', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return the user if login is successful', async () => {
    const mockUser = {
      id: 1,
      username: 'testuser',
      password: 'password',
    };

    User.findAll.mockResolvedValue([mockUser]);
    Utils.PasswordCompare.mockResolvedValue(true);

    const result = await UserSvc.login({
      username: 'testuser',
      password: 'password',
    });

    expect(User.findAll).toHaveBeenCalledWith({
      where: {
        [Op.or]: [{ username: 'testuser' }, { email: 'testuser' }],
      },
    });
    expect(Utils.PasswordCompare).toHaveBeenCalledWith('password', 'password');
    expect(result).toEqual(mockUser);
  });

  it('should throw HttpNotFound if user is not found', async () => {
    User.findAll.mockResolvedValue([]);

    await expect(
      UserSvc.login({ username: 'testuser', password: 'password' })
    ).rejects.toThrow(HttpNotFound);
  });

  it('should throw HttpNotFound if password does not match', async () => {
    const mockUser = {
      id: 1,
      username: 'testuser',
      password: 'password',
    };

    User.findAll.mockResolvedValue([mockUser]);
    Utils.PasswordCompare.mockResolvedValue(false);

    await expect(
      UserSvc.login({ username: 'testuser', password: 'password' })
    ).rejects.toThrow(HttpNotFound);
  });

  it('should throw MySqlError for other errors', async () => {
    const mockError = new Error('Some error');
    User.findAll.mockRejectedValue(mockError);

    await expect(
      UserSvc.login({ username: 'testuser', password: 'password' })
    ).rejects.toThrow(MySqlError);
  });
});

describe('fetch', () => {
  it('should return all users', async () => {
    const mockUsers = [
      { id: 1, username: 'user1' },
      { id: 2, username: 'user2' },
    ];
    User.findAll.mockResolvedValue(mockUsers);

    const result = await UserSvc.fetch();

    expect(User.findAll).toHaveBeenCalledWith({});
    expect(result).toEqual(mockUsers);
  });

  it('should throw MySqlError if database query fails', async () => {
    const mockError = new Error('Database query failed');
    User.findAll.mockRejectedValue(mockError);

    await expect(UserSvc.fetch()).rejects.toThrow(MySqlError);
  });
});

describe('create', () => {
  it('should create a new user', async () => {
    const newUser: UserAttributes = {
      username: 'newuser',
      email: 'newuser@example.com',
      password: 'password',
      fullname: 'New User',
      role: 'user',
    };
    User.findAll.mockResolvedValue([]);
    User.create.mockResolvedValue(newUser);

    const result = await UserSvc.create(newUser);

    expect(User.findAll).toHaveBeenCalledWith({
      where: {
        [Op.or]: [{ username: newUser.username }, { email: newUser.email }],
      },
    });
    expect(User.create).toHaveBeenCalledWith(newUser);
    expect(result).toEqual(newUser);
  });

  it('should throw ConflictError if username or email already exists', async () => {
    const existingUser = [
      { id: 1, username: 'existinguser', email: 'existinguser@example.com' },
    ];
    User.findAll.mockResolvedValue(existingUser);

    await expect(
      UserSvc.create({
        username: 'existinguser',
        email: 'existinguser@example.com',
        password: 'password',
        fullname: 'Existing User',
        role: 'user',
      })
    ).rejects.toThrow(ConflictError);
  });

  it('should throw MySqlError if database query fails', async () => {
    const mockError = new Error('Database query failed');
    User.findAll.mockRejectedValue(mockError);

    await expect(
      UserSvc.create({
        username: 'newuser',
        email: 'newuser@example.com',
        password: 'password',
        fullname: 'New User',
        role: 'user',
      })
    ).rejects.toThrow(MySqlError);
  });
});

describe('update', () => {
  it('should update an existing user', async () => {
    const existingUser = {
      id: 1,
      username: 'existinguser',
      fullname: 'Existing User',
    };
    User.findOne.mockResolvedValue(existingUser);
    const updatedData = { fullname: 'Updated User' };
    const updatedUser = { ...existingUser, ...updatedData };
    User.update.mockResolvedValue(updatedUser);

    const result = await UserSvc.update('existinguser', updatedData);

    expect(User.findOne).toHaveBeenCalledWith({
      where: { username: 'existinguser' },
    });
    expect(result).toEqual(updatedUser);
  });

  it('should throw HttpNotFound if user is not found', async () => {
    User.findOne.mockResolvedValue(null);

    await expect(
      UserSvc.update('nonexistinguser', { fullname: 'Updated User' })
    ).rejects.toThrow(HttpNotFound);
  });

  it('should throw MySqlError if database query fails', async () => {
    const mockError = new Error('Database query failed');
    User.findOne.mockRejectedValue(mockError);

    await expect(
      UserSvc.update('existinguser', { fullname: 'Updated User' })
    ).rejects.toThrow(MySqlError);
  });
});

describe('remove', () => {
  it('should remove an existing user', async () => {
    const existingUser = {
      id: 1,
      username: 'existinguser',
      fullname: 'Existing User',
    };
    User.findOne.mockResolvedValue(existingUser);
    const destroyResult = { success: true };
    User.destroy.mockResolvedValue(destroyResult);

    const result = await UserSvc.remove('existinguser');

    expect(User.findOne).toHaveBeenCalledWith({
      where: { username: 'existinguser' },
    });
    expect(User.destroy).toHaveBeenCalled();
    expect(result).toEqual(destroyResult);
  });

  it('should throw HttpNotFound if user is not found', async () => {
    User.findOne.mockResolvedValue(null);

    await expect(UserSvc.remove('nonexistinguser')).rejects.toThrow(
      HttpNotFound
    );
  });

  it('should throw MySqlError if database query fails', async () => {
    const mockError = new Error('Database query failed');
    User.findOne.mockRejectedValue(mockError);

    await expect(UserSvc.remove('existinguser')).rejects.toThrow(MySqlError);
  });
});
