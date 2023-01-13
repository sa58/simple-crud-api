import { v4, validate } from "uuid";
import { ValidationError, ValidationUuidError } from "./err";
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
            throw new ValidationUuidError("d");
        }

        return this.userRepository.findUser(uuid);
    }

    public createUser(data: Omit<User, "id">): User {
        if(!data.username) {
            throw new ValidationError("Field 'username' is required");
        }

        if(!data.age) {
            throw new ValidationError("Field 'age' is required");
        }

        if(!data.hobbies) {
            throw new ValidationError("Field 'hobbies' is required");
        }

        const newUser = { id: v4(), ...data };

        return this.userRepository.createUser(newUser);
    }
}

export {
    UserService
}
