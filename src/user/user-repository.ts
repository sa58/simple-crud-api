import { NotFoundError } from "../err";
import { User } from "./user-type";

class UserRepository {
    static users: User[] = [];

    public findUsers(): User[] {
        return UserRepository.users;
    }

    public findUser(uuid: string): User {
        const pos = UserRepository.users.findIndex(user => user.id === uuid)

        if(pos < 0) {
            throw new NotFoundError("User doesn't exist");
        }

        const [user] =  UserRepository.users.slice(pos, pos + 1);
        return user;
    }

    public createUser(user: User): User {
        UserRepository.users.push(user);
        return user;
    }

    get usersList() {
        return UserRepository.users;
    }
}

export {
    UserRepository
}
