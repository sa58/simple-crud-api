import { ServerResponse } from 'http';
import { NotFoundError, ValidationUuidError } from '../err';

function handleError(func: () => void, response: ServerResponse) {
    return function() {
        try {
            func();
        } catch(err) {
            if(err instanceof NotFoundError) {
                response.writeHead(+err.name);
                response.end(err.message);
            } else if(err instanceof ValidationUuidError) {
                response.writeHead(+err.name);
                response.end(err.message);
            } else if(err instanceof SyntaxError) {
                response.writeHead(400);
                response.end('SyntaxError');
            } else {
                response.writeHead(500);
                response.end('Server error');
            }

            console.log((err as Error).message);
        }
    };
}

export {
    handleError
}
