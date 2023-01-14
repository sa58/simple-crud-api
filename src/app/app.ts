import * as dotenv from "dotenv";
import http, { IncomingMessage, ServerResponse } from "http";
import { RESOURCE_USERS } from "./constants";
import { handleError } from "./lib/handle-error";
import { isResourceValid } from "./lib/is-resource-valid";
import { UserController } from "./user/user-controller";
import { NotFoundError } from "./err";

dotenv.config();

export const app = (request: IncomingMessage, response: ServerResponse) => {
    response.setHeader('Content-Type', 'application/json');

    const initializeApp = () => {
        const { url , method } = request;

        if (method && (url && isResourceValid(url, RESOURCE_USERS))) {
            const userController = new UserController(url, method, response, request);
            userController.setServiceMethod();
        } else {
            throw new NotFoundError("Endpoint doesn't exist");
        }
    }

    handleError(initializeApp, response)();
}

export const bootstrap = () => http.createServer(app).listen(process.env.NODE_PORT);
