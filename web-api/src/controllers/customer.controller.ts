import { NextFunction, Request, Response } from "express";

import { asyncMiddleware } from "../middlewares/async.middleware";
import HttpException, { ResponseHttpCode } from "../exceptions/HttpException";
import CustomerModel from "../models/customer.model";
import Database from "../config/database";
import { Op } from "sequelize";

const dbInstance = Database.getInstance().sequelize;

class CustomerController {
  validateRequestedPayload = asyncMiddleware(
    (req: Request, res: Response, next: NextFunction) => {
      const customerName = req.body.customerName
        ? req.body.customerName.trim()
        : undefined;

      if (customerName === undefined) {
        throw new HttpException(
          400,
          ResponseHttpCode.BadRequest,
          "กรุณากรอกชื่อ"
        );
      }

      next();
    }
  );

  public getAll = asyncMiddleware(
    async (req: Request, res: Response, next: NextFunction) => {
      const keyword = req.query.keyword
        ? `%${(req.query.keyword as string).trim()}%`
        : "%%";

      const customers = await CustomerModel.findAndCountAll({
        where: {
          customerName: {
            [Op.iLike]: `${keyword}`,
          },
        },
        order: [["createdAt", "desc"]],
      });

      res.json({
        object: "customer",
        rows: customers.rows,
        count: customers.count,
      });
    }
  );

  public search = asyncMiddleware(
    async (req: Request, res: Response, next: NextFunction) => {
      const keyword = req.query.keyword
        ? (req.query.keyword as string).trim()
        : undefined;

      if (keyword) {
        const customers = await CustomerModel.findAll({
          where: {
            customerName: {
              [Op.iLike]: `%${keyword}%`,
            },
          },
          attributes: [
            ["customer_id", "key"],
            ["customer_name", "value"],
          ],
        });

        res.json({
          object: "customer",
          rows: customers,
        });
      } else {
        res.json({
          object: "customer",
          rows: [],
        });
      }
    }
  );

  public create = asyncMiddleware(
    async (req: Request, res: Response, next: NextFunction) => {
      const mobileNumber = req.body.mobileNumber
        ? req.body.mobileNumber.trim()
        : "";

      await CustomerModel.create({
        customerName: req.body.customerName.trim(),
        mobileNumber,
      });

      res.status(200).json({
        object: "customer",
        message: "เพิ่มข้อมูลสำเร็จ",
        ...req.body,
      });
    }
  );
}

export default CustomerController;
