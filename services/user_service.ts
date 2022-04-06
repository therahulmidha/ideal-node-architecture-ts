import { Request, Response } from "express";
import { UserModel } from "../models/user";
import { ConflictError, NotFoundError } from "../utils/response/error_handler";
import bcrypt from "bcryptjs";
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
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
    
    // at the time of login: 
    // Load hash from your password DB.
    // bcrypt.compareSync("B4c0/\/", hash); // true
    // bcrypt.compareSync("not_bacon", hash); // false

    const userData = new UserModel(user);
    return await userData.save();
  };

  public updateUserById = async (req: Request, res: Response) => {
    // check if email exists
    const existingUser = await UserModel.findOne({
      _id: req.params.id,
    });
    if (!existingUser) {
      throw new NotFoundError(res, "User with provided id not found");
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
