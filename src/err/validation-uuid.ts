class ValidationUuidError extends Error {
    constructor(message: string) {
        super();
        this.name = '400';
        this.message = message;
    }
}

export {
    ValidationUuidError
}
