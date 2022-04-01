import { Request, Response } from "express";
import { UserService } from "../services/user_service";
const userService = new UserService();
export class UserController {
    public getUserById = async (req: Request, res: Response) => {
        try {
            // validate
            // the req.params.id
            // return res.status(400).json({
            //     message: "Validation failed"
            // })

            const user = await userService.getUserById(req, res);
            if (user) {
                return res.json({
                    data: user,
                });
            }
            return res.status(404).json({
                msg: "Unable to find user"
            })
        } catch (error) {
            throw new Error("Internal Server Error")
        }
    }
}