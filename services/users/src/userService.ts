const { User, UserModel } = require('./userModel');

class UserService {
    async createUser(user: typeof User): Promise<typeof User> {
        const newUser = new UserModel(user);
        return await newUser.save();
    }
    async getAllUsers(): Promise<typeof User[] | null> {
        return await UserModel.find().exec();
    }
    async getUserById(id: string): Promise<typeof User | null> {
        return await UserModel.findById(id).exec();
    }
    async updateUser(id: string, updatedData: Partial<typeof User>): Promise<typeof User> {
        return await UserModel.findByIdAndUpdate(id, updatedData, { new: true }).exec();
    }
}

export { UserService };