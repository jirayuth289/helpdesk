import cors, { CorsOptions } from "cors";
import express from "express";
import helmet from "helmet";
import hpp from "hpp";
import compression from "compression";
import logger from "morgan";
import http from "http";
import path from "path";

import Routes from "./interfaces/routes.interface";
import errorMiddleware from "./middlewares/error.middleware";
import Database from "./config/database";
import config from "./config/config";

class App {
  public app: express.Application;
  public env: boolean;
  public server: http.Server;
  public port = config.port || 9000;

  constructor(routes: Routes[]) {
    this.app = express();
    this.server = http.createServer(this.app);
    this.env = process.env.NODE_ENV === "production" ? true : false;

    Database.getInstance()
      .sequelize.authenticate()
      .then(() => {
        this.initializeMiddlewares();
        this.initializeLogBody();
        this.initializeRoutes(routes);
        this.initializeErrorHandling();
      })
      .catch((error: any) => {
        console.error("Unable to connect to the database:", error);
      });
  }

  public getServer() {
    return this.server;
  }

  public listen() {
    this.server.listen(this.port, () => {
      console.log(`🚀 App listening on the port ${this.port}`);
    });
  }

  private initializeLogBody() {
    this.app.use(
      (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        if (!this.env) {
          console.log(req.body);
        }
        next();
      }
    );
  }

  private initializeMiddlewares() {
    if (this.env) {
      this.app.set("trust proxy", 1); // trust first proxy
      this.app.use(compression());
      this.app.use(hpp());
      this.app.use(helmet());
      this.app.use(logger("combined"));
    } else {
      this.app.use(logger("dev"));
    }

    const corsOptions: CorsOptions = {
      //@ts-ignore
      origin: function (origin: string, callback: Function) {
        if (config.whitelist.indexOf(origin) !== -1) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      },
      credentials: true,
    };

    // ORM
    // Database.getInstance().sequelize.sync();

    this.app.use(cors(corsOptions));
    this.app.use(express.static(path.join(__dirname, "..", "public")));
    this.app.use(express.json({ limit: "1mb" }));
    this.app.use(express.urlencoded({ extended: true }));
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach((route) => {
      this.app.use("/v1/", route.router);
    });
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default App;
