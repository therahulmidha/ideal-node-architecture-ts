import { Request, Response } from "express";
import { UserModel } from "../models/User";
import { ConflictError, NotFoundError } from "../utils/error_handler";
export class UserService {
  public getUserById = async (req: Request, res: Response) => {
    return await UserModel.findOne({
      _id: req.params.id,
    });
  };

  public getAllUsers = async () => {
    return UserModel.find();
  };

  public saveUser = async (req: Request, res: Response) => {
    const user = req.body;

    // check if email exists
    const existingUser = await UserModel.findOne({
      email: user.email,
    });
    if (existingUser) {
      throw new ConflictError(res, "User with this email already exists");
    }
    const userData = new UserModel(user);
    return await userData.save();
  };

  public updateUserById = async (req: Request, res: Response) => {
    const user = req.body;

    // check if email exists
    const existingUser = await UserModel.findOne({
      email: user.email,
    });
    if (existingUser) {
      throw new ConflictError(res, "User with this email already exists");
    }
    return await UserModel.findByIdAndUpdate(req.params.id, req.body);
  };

  public deleteUserById = async (req: Request, res: Response) => {
    // check if email exists
    const existingUser = UserModel.findOne({
      _id: req.params.id,
    });

    if (!existingUser) {
      throw new NotFoundError(res, "User with provided id not found");
    }

    const deleteResult = await UserModel.deleteOne({
      _id: req.params.id,
    });
    return deleteResult.deletedCount;
  };
}
