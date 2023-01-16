import * as dotenv from "dotenv";
import cluster from 'node:cluster';
import http, { IncomingMessage, ServerResponse } from 'node:http';
import { cpus } from "node:os";
import { initializeApp } from "./app";

dotenv.config();

if (cluster.isPrimary) {

    const numCPUs = cpus().length;
  
    for (let i = 1; i <= numCPUs; i++) {
        cluster.fork({port: Number(process.env.NODE_PORT!) + i});
    }
    
    
    const postData = JSON.stringify({
        'msg': 'Hello World!',
    });
  
    http
        .createServer((request: IncomingMessage, response: ServerResponse) => {
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
                // res
                // res.on('data', (chunk) => {
                //     console.log(`BODY: ${chunk}`);
                // });
                
                // res.on('end', () => {
                //     console.log('No more data in response.');
                // });
        
                // response.end()

                res.on('data', (chunk: any) => {
                    response.end(chunk);
                  });
            });
              
            req.on('error', (e) => {
                console.error(`problem with request: ${e.message}`);
            });
              
            // Write data to request body
            // req.write(postData);
            req.end();
        })
        .listen(4000, () => {
            console.log(`Master ${process.pid} is running`, process.env.port);
        })
} else {
    http
        .createServer(initializeApp)
        .listen(process.env.port, () => {
            console.log(`Worker ${process.pid} started`, process.env.port);
        })
}
