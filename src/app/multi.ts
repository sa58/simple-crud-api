import * as dotenv from "dotenv";
import cluster from 'node:cluster';
import http, { IncomingMessage, ServerResponse } from 'node:http';
import { cpus } from "node:os";
import { bootstrap, initializeApp } from "./app";

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
        .createServer(initializeApp)
        .listen(4000, () => {
            console.log(`Master ${process.pid} is running`, process.env.port);
        })

        // bootstrap1().listen(4000, '127.0.0.1', () => {
        //     console.log(`\nServer pid: ${process.pid} started on port ${4000}`);
        //     // @ts-ignore
        //     for (const worker of Object.values(cluster.workers)) {
        //         // @ts-ignore
        //         console.log(worker.id)
        //         // worker.send('big announcement to all workers');
        //       }

        // })
    
} else {
    // Workers sharing same TCP connection

    // bootstrap1().listen(process.env.NODE_PORT + cluster.worker.id, '127.0.0.1', () => {
    //     console.log(`\nServer pid: ${process.pid} started on port ${process.env.NODE_PORT + cluster.worker.id}`);
    // })
    http
        .createServer(initializeApp)
        .listen(process.env.port, () => {
            console.log(`Master ${process.pid} is running`, process.env.port);
            console.log(`Worker ${process.pid} started`, process.env.port);
        })
    
}


//   (request: IncomingMessage, response: ServerResponse) => {
//     const options = {
//         hostname: 'localhost',
//         port: 4001,
//         path: '/api/users',
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//             // 'Content-Length': Buffer.byteLength(postData),
//         },
//     };

//     const req = http.request(options, (res) => {
//         console.log(`STATUS: ${res.statusCode}`);
//         console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
//         res.setEncoding('utf8');
        
//         res.on('data', (chunk) => {
//             console.log(`BODY: ${chunk}`);
//         });
        
//         res.on('end', () => {
//             console.log('No more data in response.');
//         });
//     });
      
//     req.on('error', (e) => {
//         console.error(`problem with request: ${e.message}`);
//     });
      
//     // Write data to request body
//     req.write(postData);
//     req.end();
// }