import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/user_service";
import { validateUser } from "../models/user";
import {
  CustomError,
  ForbiddenError,
  NotFoundError,
} from "../utils/response/error_handler";
import {
  getJoiValiationError,
  validateMongooseObjectId,
} from "../utils/helpers/validation_helpers";
import { ResponseHandler } from "../utils/response/response_handler";
import { UserServicePg } from "../services/user_service_pg";
const userService = new UserService();
// const userService = new UserServicePg();
export class UserController {
  public getUserById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      // validate the req.params.id
      const validate = validateMongooseObjectId(req.params.id);
      if (validate.error) {
        return new ForbiddenError(
          res,
          getJoiValiationError(validate)
        ).getResponse();
      }

      const user = await userService.getUserById(req, res);
      if (user) {
        return new ResponseHandler(
          res,
          "User Retrieved Successfully",
          user
        ).getResponse();
      }
      return new NotFoundError(res, "User not found").getResponse();
    } catch (error) {
      next(error);
    }
  };

  public getAllUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      // call service method to perform actual operation
      const users = await userService.getAllUsers();
      if (users) {
        return new ResponseHandler(
          res,
          "Users Retrieved Successfully",
          users
        ).getResponse();
      }

      // In case of unsuccessful operation
      return new CustomError(res, "Unable to retrieve users").getResponse();
    } catch (error) {
      next(error);
    }
  };

  public saveUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // validate req.body
      const validate = validateUser(req.body);
      if (validate.error) {
        return new ForbiddenError(
          res,
          getJoiValiationError(validate)
        ).getResponse();
      }

      // call service method to perform actual operation
      const user = await userService.saveUser(req, res);
      if (user) {
        return new ResponseHandler(
          res,
          "User Created Successfully",
          user
        ).getResponse();
      }

      // In case of unsuccessful operation
      return new CustomError(res, "Unable to create user").getResponse();
    } catch (error) {
      next(error);
    }
  };

  public updateUserById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      // validate req.body
      const validate = validateUser(req.body);
      if (validate.error) {
        return new ForbiddenError(
          res,
          getJoiValiationError(validate)
        ).getResponse();
      }

      // call service method to perform actual operation
      const updateResult = await userService.updateUserById(req, res);
      console.log(updateResult);
      if (updateResult) {
        return new ResponseHandler(res, "User Updated Successfully", {
          updated: true,
        }).getResponse();
      }

      // In case of unsuccessful operation
      return new CustomError(res, "Unable to update user").getResponse();
    } catch (error) {
      next(error);
    }
  };

  public deleteUserById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      // call service method to perform actual operation
      // validate the req.params.id
      const validate = validateMongooseObjectId(req.params.id);
      if (validate.error) {
        return new ForbiddenError(
          res,
          getJoiValiationError(validate)
        ).getResponse();
      }

      const deleted = await userService.deleteUserById(req, res);
      if (deleted) {
        return new ResponseHandler(res, "User Deleted Successfully", {
          deleted: true,
        }).getResponse();
      }

      // In case of unsuccessful operation
      return new CustomError(res, "Unable to delete user").getResponse();
    } catch (error) {
      next(error);
    }
  };
}
