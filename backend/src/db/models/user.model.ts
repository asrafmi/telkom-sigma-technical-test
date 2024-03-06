import { DataTypes, Model } from 'sequelize';
import sequelizeConnection from '../../config/db-connect';

enum Role {
  ADMIN = 'admin',
  USER = 'user',
}

export interface UserAttributes {
  id?: number;
  username: string;
  email: string;
  password: string;
  fullname: string;
  role: Role;
  token?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

class User extends Model<UserAttributes> implements UserAttributes {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public fullname!: string;
  public token!: string;
  public role!: Role;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static associate(models: any) {
    User.hasMany(models.Event, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE',
      as: 'events',
    });
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    fullname: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM(Role.ADMIN, Role.USER),
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeConnection,
    tableName: 'Users',
    timestamps: true,
  }
);

export default User;
