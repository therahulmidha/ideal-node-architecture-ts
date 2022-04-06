import { Request, Response } from "express";
import { ConflictError, NotFoundError } from "../utils/response/error_handler";
import { PgPool } from "../database/pg_connect";
import { UserSq } from "../models/user_sq";

export class UserServicePg {
  pgPool = PgPool.get();
  public getUserById = async (req: Request, res: Response) => {
    // const user = await this.pgPool.query(
    //   "Select * from public.user where id= $1",
    //   [req.params.id]
    // );
    // return user.rows[0];

    // using sequelize
    return UserSq.findByPk(req.params.id);
  };

  public getAllUsers = async () => {
    const users = await this.pgPool.query("Select * from public.user");
    return users.rows;
  };

  public saveUser = async (req: Request, res: Response) => {
    // To be implemented
    return {};
  };

  public updateUserById = async (req: Request, res: Response) => {
    // To be implemented
    return {};
  };

  public deleteUserById = async (req: Request, res: Response) => {
    // To be implemented
    return {};
  };
}
