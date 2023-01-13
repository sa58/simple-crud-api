import { NotFoundError } from "./err";
import { User } from "./user-type";

class UserRepository {
    private users: User[];

    constructor() {
        this.users = [];
    }

    public findUsers(): User[] {
        return this.users;
    }

    public findUser(uuid: string): User {
        const pos = this.users.findIndex(user => user.id === uuid)

        if(pos < 0) {
            throw new NotFoundError();
        }

        const [user] =  this.users.slice(pos, pos + 1);
        return user;
    }

    public createUser(user: User): User {
        this.users.push(user);
        return user;
    }

    get user() {
        return this.users;
    }
}

export {
    UserRepository
}
