import * as dotenv from 'dotenv';
import http, { IncomingMessage, ServerResponse } from 'http';
import { hi } from "./app";

dotenv.config();

const app = (request: IncomingMessage, response: ServerResponse) => {
    hi();
    console.log(request.url);
}

http
    .createServer(app)
    .listen(process.env.NODE_PORT);
