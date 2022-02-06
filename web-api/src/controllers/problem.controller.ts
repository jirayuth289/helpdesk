import { NextFunction, Request, Response } from "express";

import { asyncMiddleware } from "../middlewares/async.middleware";
import HttpException, { ResponseHttpCode } from "../exceptions/HttpException";
import ProblemModel from "../models/problem.model";
import CustomerModel from "../models/customer.model";
import LocationModel from "../models/location.model";
import Database from "../config/database";
import { Op } from "sequelize";

const dbInstance = Database.getInstance().sequelize;

class ProblemController {
  validateRequestedPayload = asyncMiddleware(
    (req: Request, res: Response, next: NextFunction) => {
      const customerId = req.body.customerId ? req.body.customerId : undefined;
      const type = req.body.type ? req.body.type.trim() : undefined;
      const description = req.body.description
        ? req.body.description.trim()
        : undefined;

      if (customerId === undefined) {
        throw new HttpException(
          400,
          ResponseHttpCode.BadRequest,
          "กรุณาระบุผู้แจ้งปัญหา"
        );
      } else if (type === undefined) {
        throw new HttpException(
          400,
          ResponseHttpCode.BadRequest,
          "กรุณาระบุประเภทปัญหา"
        );
      } else if (description === undefined) {
        throw new HttpException(
          400,
          ResponseHttpCode.BadRequest,
          "กรุณากรอกรายละเอียด"
        );
      }

      if (type === "แจ้งซ่อม") {
        const problemPayload = req.body.location;
        const project = problemPayload.project
          ? problemPayload.project.trim()
          : undefined;
        const addressNo = problemPayload.addressNo
          ? problemPayload.addressNo.trim()
          : undefined;
        const repairType = problemPayload.repairType
          ? problemPayload.repairType.trim()
          : undefined;

        if (project === undefined) {
          throw new HttpException(
            400,
            ResponseHttpCode.BadRequest,
            "กรุณาระบุโครงการที่เกิดปัญหา"
          );
        } else if (addressNo === undefined) {
          throw new HttpException(
            400,
            ResponseHttpCode.BadRequest,
            "กรุณาระบุที่อยู่"
          );
        } else if (repairType === undefined) {
          throw new HttpException(
            400,
            ResponseHttpCode.BadRequest,
            "กรุณาระบุหมวดหมู่การแจ้งซ่อม"
          );
        }
      }

      next();
    }
  );

  public getAll = asyncMiddleware(
    async (req: Request, res: Response, next: NextFunction) => {
      const keyword = req.query.keyword
        ? `%${(req.query.keyword as string).trim()}%`
        : "%%";

      const problem = await ProblemModel.findAndCountAll({
        where: {
          description: {
            [Op.iLike]: keyword,
          },
        },
        order: [["createdAt", "desc"]],
        include: [
          {
            model: LocationModel,
          },
          {
            model: CustomerModel,
          },
        ],
      });

      res.json({
        object: "problem",
        rows: problem.rows,
        count: problem.count,
      });
    }
  );

  public create = asyncMiddleware(
    async (req: Request, res: Response, next: NextFunction) => {
      const note = req.body.note ? req.body.note.trim() : "";

      await dbInstance.transaction(async (t) => {
        const customerQueryResult = await CustomerModel.findByPk(
          req.body.customerId,
          {
            lock: true,
          }
        );
        if (!customerQueryResult) {
          throw new HttpException(
            400,
            ResponseHttpCode.BadRequest,
            "ไม่พบข้อมูลลูกค้า"
          );
        } else {
          if (req.body.type.trim() === "แจ้งซ่อม") {
            const problemPayload = req.body.location;

            await ProblemModel.create(
              {
                customerId: req.body.customerId,
                type: req.body.type.trim(),
                description: req.body.description.trim(),
                note,
                Location: {
                  project: problemPayload.project.trim(),
                  addressNo: problemPayload.addressNo.trim(),
                  repairType: problemPayload.repairType.trim(),
                },
              },
              {
                include: [LocationModel],
              }
            );
          } else {
            await ProblemModel.create({
              customerId: req.body.customerId,
              type: req.body.type.trim(),
              description: req.body.description.trim(),
              note,
            });
          }
        }
      });

      res.status(200).json({
        object: "problem",
        message: "เพิ่มข้อมูลสำเร็จ",
        data: req.body,
      });
    }
  );
}

export default ProblemController;
