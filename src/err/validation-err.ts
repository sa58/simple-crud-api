import { HTTPCodes } from "../enum/http-codes";

class ValidationError extends Error {
    constructor(message: string) {
        super();
        this.name = HTTPCodes.NOT_FOUND;
        this.message = message;
    }
}

export {
    ValidationError
}
