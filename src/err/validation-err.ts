class ValidationError extends Error {
    constructor() {
        super();
        this.name = '400';
        this.message = 'VALIDATION';
    }
}

export {
    ValidationError
}
