const { UserService } = require('./userService');
import { Request, Response } from "express";

class UserController {
    private userService = new UserService();

    async createUser(req: Request, res: Response) {
        try {
            const user = await this.userService.createUser(req.body);
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ message: 'Error creating user!' })
        }
    }
}

export { UserController };