import { v4, validate } from "uuid";
import { ValidationUuidError } from "./err";
import { UserRepository } from "./user-repository"
import { User } from "./user-type";

class UserService {
    private userRepository = new UserRepository();

    public getUsers(): User[] {
        return this.userRepository.findUsers();
    }

    public getUser(url: string): User {
        const [,,, uuid] = url.split('/');

        if(!validate(uuid)) {
            throw new ValidationUuidError();
        }

        return this.userRepository.findUser(uuid);
    }

    public createUser(data: Omit<User, "id">): User {
        if(!data.username || !data.age || !data.hobbies) {
            throw new ValidationUuidError();
        } 

        const newUser = { id: v4(), ...data };

        return this.userRepository.createUser(newUser);
    }
}

export {
    UserService
}
