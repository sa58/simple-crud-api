const isResourceValid = (url: string, resource: string) => {
    return url?.startsWith(`${resource}/`) || url === resource;
}

export {
    isResourceValid
}
