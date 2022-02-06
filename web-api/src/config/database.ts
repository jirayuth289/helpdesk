import { Sequelize, Options } from "sequelize";
import { createNamespace } from "cls-hooked";
import config from "./config";
import path from "path";

const dbConfig = config.database as Options;
class Database {
  private static instance: Database;
  private _sequelize: Sequelize;

  private constructor() {
    const namespace = createNamespace("my-very-own-namespace");
    Sequelize.useCLS(namespace);
    this._sequelize = new Sequelize(dbConfig);
  }

  public static getInstance(): Database {
    try {
      if (!Database.instance) {
        Database.instance = new Database();
      }

      return Database.instance;
    } catch (error) {
      throw error;
    }
  }

  get sequelize() {
    return this._sequelize;
  }

  public static initializeModels() {
    require(path.join(__dirname, "/../models/customer.model"));
  }
}

export default Database;
