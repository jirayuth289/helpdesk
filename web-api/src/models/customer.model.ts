import {
  Model,
  DataTypes,
} from "sequelize";

import Database from "../config/database";
import ProblemModel from "./problem.model";

const sequelize = Database.getInstance().sequelize;

class CustomerModel extends Model {
  public customerId!: number;
  public customerName!: string;
  public mobileNumber!: string;

  public dataValues!: any;
}

CustomerModel.init(
  {
    customerId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    customerName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    mobileNumber: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Customer",
    underscored: true,
    timestamps: true,
    updatedAt: false,
    version: true
  }
);

CustomerModel.hasMany(ProblemModel, {
  foreignKey: "customerId",
  sourceKey: "customerId",
  onDelete: "cascade",
  onUpdate: 'cascade'
});
ProblemModel.belongsTo(CustomerModel, {
  foreignKey: "customerId",
  targetKey: "customerId",
});

export default CustomerModel;
