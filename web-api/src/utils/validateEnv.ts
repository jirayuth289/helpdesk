import { cleanEnv, port, str, num } from "envalid";

function validateEnv() {
  cleanEnv(process.env, {
    NODE_ENV: str(),
    CLIENT_HOST: str(),
    HOST: str(),
    PORT: port(),
  });

  if (
    process.env.NODE_ENV === "test" ||
    process.env.NODE_ENV === "production"
  ) {
    cleanEnv(process.env, {
      DB_USERNAME: str(),
      DB_PASSWORD: str(),
      DB_NAME: str(),
      DB_HOST: str(),
      DB_PORT: port(),
    });
  }
}

export default validateEnv;
