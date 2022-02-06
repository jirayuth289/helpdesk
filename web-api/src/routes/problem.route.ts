import { Router } from "express";
import Route from "../interfaces/routes.interface";
import ProblemController from "../controllers/problem.controller";

class ProblemRoute implements Route {
  public router = Router();
  private problemController = new ProblemController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router
      .route("/problem")
      .post(
        this.problemController.validateRequestedPayload,
        this.problemController.create
      )
      .get(this.problemController.getAll)
  }
}

export default ProblemRoute;
