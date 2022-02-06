import { Model, DataTypes } from "sequelize";
import Database from "../config/database";
import LocationModel from "./location.model";

const sequelize = Database.getInstance().sequelize;

class ProblemModel extends Model {
  public problemId!: number;
  public customerId!: number;
  public type!: string;
  public description!: string;
  public note!: string;

  public dataValues!: any;
}

ProblemModel.init(
  {
    problemId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Customer',
        key: "customerId",
      },
    },
    type: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    note: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Problem",
    underscored: true,
    timestamps: true,
    updatedAt: false
  }
);

ProblemModel.hasOne(LocationModel, {
  foreignKey: 'problemId',
  sourceKey: 'problemId',
  onDelete: 'cascade',
  onUpdate: 'casecade'
});

LocationModel.belongsTo(ProblemModel, {
  foreignKey: 'problemId',
  targetKey: 'problemId'
})

export default ProblemModel;
