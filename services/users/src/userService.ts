const { User, UserModel } = require('./userModel');

class UserService {
    async createUser(user: typeof User): Promise<typeof User> {
        const newUser = new User(user);
        return await newUser.save();
    }
}

export { UserService };