import { ServerResponse } from "http";
import { HTTPCodes } from "../enum/http-codes";

function handleError(func: () => void, response: ServerResponse) {
    return function() {
        try {
            func();
        } catch (err) {
            if (err instanceof Error) {
                response.writeHead(Number(err.name) || Number(HTTPCodes.SERVER_ERROR));
                response.end(JSON.stringify({message: err.message}));
            }
        }
    };
}

export {
    handleError
}
