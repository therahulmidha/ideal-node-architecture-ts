import { Request, Response, NextFunction } from "express";
export function authorize (req: Request, res: Response, next: NextFunction) {
    next();
}