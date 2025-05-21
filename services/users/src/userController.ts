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
    async getUserById(req: Request, res: Response): Promise<any> {
        try {
            const user = await this.userService.getUserById(req.params.id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving user', error });
        }
    }
    async updateUser(req: Request, res: Response): Promise<any> {
        try {
            const user = await this.userService.updateUser(req.params.id, req.body);
            if (!user) {
                return res.status(404).json({ message: 'User not found!' });
            } res.json(user);
        } catch (error) {
            res.status(500).json({ message: 'Error updating user!' });
        }
    }
}

export { UserController };