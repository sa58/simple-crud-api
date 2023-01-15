import * as dotenv from "dotenv";
import http, { IncomingMessage, ServerResponse } from "http";
import { RESOURCE_USERS } from "./constants";
import { handleError } from "./lib/handle-error";
import { isResourceValid } from "./lib/is-resource-valid";
import { UserController } from "./modules/user/user-controller";
import { NotFoundError } from "./err";

dotenv.config();

export const initializeApp = (request: IncomingMessage, response: ServerResponse) => {
    const { url , method } = request;

    console.log(process.pid)

    const options = {
        hostname: 'localhost',
        port: 4001,
        path: '/api/users',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            // 'Content-Length': Buffer.byteLength(postData),
        },
    };

    const req = http.request(options, (res) => {
        console.log(`STATUS: ${res.statusCode}`);
        console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
        res.setEncoding('utf8');
        
        res.on('data', (chunk) => {
            console.log(`BODY: ${chunk}`);
        });
        
        res.on('end', () => {
            console.log('No more data in response.');
        });
    });
      
    req.on('error', (e) => {
        console.error(`problem with request: ${e.message}`);
    });
      
    // Write data to request body
    // req.write(postData);
    req.end();



    // if (method && (url && isResourceValid(url, RESOURCE_USERS))) {
    //     const userController = new UserController(url, method, response, request);
    //     userController.setServiceMethod();
    // } else {
    //     throw new NotFoundError("Endpoint doesn't exist");
    // }
}

export const app = (request: IncomingMessage, response: ServerResponse) => {
    response.setHeader('Content-Type', 'application/json');


    handleError(() => initializeApp(request, response), response)();
}

export const bootstrap = () => http.createServer(app).listen(process.env.NODE_PORT);
