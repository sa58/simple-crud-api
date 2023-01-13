class NotFoundError extends Error {
    constructor() {
        super();
        this.name = '404';
        this.message = 'RESOURCE_NOT_FOUND';
    }
}

export {
    NotFoundError
}
