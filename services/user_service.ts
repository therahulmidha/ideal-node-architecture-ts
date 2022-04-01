import { Request, Response } from "express";
export class UserService {
    public getUserById = async (req: Request, res: Response) => {
        return {
            name: "Joe",
            email: "joe@gmail.com"
        }
    }
}