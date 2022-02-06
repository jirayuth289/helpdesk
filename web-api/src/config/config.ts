import development from "./env/development";
import production from "./env/production";
import test from "./env/test";
const dbConfig = require("../../db-config/config.js")[
  process.env.NODE_ENV as string
];

const envConfig =
  process.env.NODE_ENV === "development"
    ? development
    : process.env.NODE_ENV === "test"
    ? test
    : production;

export default { ...envConfig, database: dbConfig };
