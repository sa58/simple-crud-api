class ValidationUuidError extends Error {
    constructor() {
        super();
        this.name = '400';
        this.message = 'ValidationUuidError';
    }
}

export {
    ValidationUuidError
}
