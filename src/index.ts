import * as dotenv from 'dotenv';
import http, { IncomingMessage, ServerResponse } from 'http';
import { RESOURCE_USERS } from './constants';
import { NotFoundError } from './err';
import { handleError } from './lib/handle-error';
import { isResourceValid } from './lib/is-resource-valid';
import { UserController } from './user-controller';

dotenv.config();

const app = (request: IncomingMessage, response: ServerResponse) => {
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

http.createServer(app).listen(process.env.NODE_PORT);
