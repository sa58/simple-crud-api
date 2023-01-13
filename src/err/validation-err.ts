import { HTTPCodes } from "../enum/http-codes";

class ValidationError extends Error {
    constructor(message: string) {
        super();
        this.name = HTTPCodes.VALIDATION_ERRROR;
        this.message = message;
    }
}

export {
    ValidationError
}
