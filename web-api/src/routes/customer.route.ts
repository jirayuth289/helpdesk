import { Router } from "express";
import Route from "../interfaces/routes.interface";
import CustomerController from "../controllers/customer.controller";

class CustomerRoute implements Route {
  public router = Router();
  private customerController = new CustomerController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router
      .route("/customer")
      .post(
        this.customerController.validateRequestedPayload,
        this.customerController.create
      )
      .get(this.customerController.getAll);

      this.router
      .route("/customer/search").get(this.customerController.search)
  }
}

export default CustomerRoute;
