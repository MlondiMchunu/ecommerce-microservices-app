const { UserService } = require('./userService');
import { Request, Response } from "express";

class UserController {
    private userService = new UserService();

    async createUser(req: Request, res: Response) {
        try {
            const user = await this.userService.createUser(req.body);
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ message: 'Error creating user!', error })
        }
    }
    async getAllUsers(req: Request, res: Response) {
        try {
            const users = await this.userService.getAllUsers();
            res.status(201).json(users);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving users' });
        }
    }
    async getUserById(req: Request, res: Response) {
        try {
            const user = await this.userService.getUserById(req.body.id);
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving user', error });
        }
    }
}

export { UserController };