import { Request, Response, NextFunction } from "express";

export default class AccountController {

    static async MyAccount(req: Request, res: Response, next: NextFunction){
        try {
            
        } catch (error) {
            next(error);
        }
    }

    static async ChangePassword(req: Request, res: Response, next: NextFunction){
        try {
            
        } catch (error) {
            next(error);
        }
    }

}