
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

    public updateUser(uuid: string, user: User): User {
        const pos = UserRepository.users.findIndex(user => user.id === uuid)

        if(pos < 0) {
            throw new NotFoundError("User doesn't exist");
        }

        UserRepository.users[pos] = { ...user };
        return UserRepository.users[pos];
    }

    public createUser(user: User): User {
        UserRepository.users.push(user);
        return user;
    }

    public deleteUser(uuid: string): void {
        const pos = UserRepository.users.findIndex(user => user.id === uuid)

        if(pos < 0) {
            throw new NotFoundError("User doesn't exist");
        }

        UserRepository.users.splice(pos, 1);
    }
}

export {
    UserRepository
}
