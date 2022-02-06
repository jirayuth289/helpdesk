import { Model, DataTypes } from "sequelize";
import Database from "../config/database";

const sequelize = Database.getInstance().sequelize;

class LocationModel extends Model {
  public problemId!: number;
  public project!: string;
  public addressNo!: string;
  public repairType!: string;

  public dataValues!: any;
}

LocationModel.init(
  {
    problemId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: 'Problem',
        key: "problemId",
      },
    },
    project: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    addressNo: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    repairType: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  },
  {
    sequelize,
    modelName: "Location",
    underscored: true,
    timestamps: false
  }
);

export default LocationModel;
