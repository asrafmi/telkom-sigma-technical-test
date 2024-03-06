import { DataTypes, Model } from 'sequelize';
import sequelizeConnection from '../../config/db-connect';

export interface EventAttributes {
  id?: number;
  name: string;
  description: string;
  date: Date;
  location: string;
  user_id: number;
  createdAt?: Date;
  updatedAt?: Date;
}

class Event extends Model<EventAttributes> implements EventAttributes {
  public id!: number;
  public name!: string;
  public description!: string;
  public date!: Date;
  public location!: string;
  public user_id!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static associate(models: any) {
    Event.belongsTo(models.User, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE',
      as: 'user',
    });
  }
}

Event.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize: sequelizeConnection,
    modelName: 'Event',
  }
);

export default Event;
