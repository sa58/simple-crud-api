import { IncomingMessage, ServerResponse } from "http";
import { RESOURCE_USERS } from "./constants";
import { HTTPCodes } from "./enum/http-codes";
import { handleError } from "./lib/handle-error";
import { UserService } from "./user-service";

class UserController {
    private url: string;

    private method: string;

    private response: ServerResponse;

    private request: IncomingMessage;

    private userService = new UserService();

    constructor(url: string, method: string, response: ServerResponse, request: IncomingMessage) {
        this.method = method;
        this.url = url;
        this.response = response;
        this.request = request;
    }

    public setServiceMethod(): void {
        if (this.method === 'GET') {
            if (RESOURCE_USERS === this.url) {
                this.getUsers();
            }

            if (this.url.startsWith(`${RESOURCE_USERS}/`)) {
                this.getUser();
            }
        }

        if (this.method === 'POST') {
            this.createUser();
        }
    }

    public getUsers(): void {
        const users = this.userService.getUsers();

        this.response.end(JSON.stringify(users));
    }

    public getUser(): void {
        const user = this.userService.getUser(this.url);
        this.response.end(JSON.stringify(user));
    }

    public createUser(): void {
        let rawData = '';

        const create = () => {
            const data = JSON.parse(rawData);

            const user = this.userService.createUser(data);
            this.response.writeHead(Number(HTTPCodes.CREATED));
            this.response.end(JSON.stringify(user));
        }

        this.request
            .on('data', (chunk: string) => {
                rawData += chunk;
            })
            .on('end', handleError(create, this.response));
    }
}

export {
    UserController
}
