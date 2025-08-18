export default class ResponseError extends Error {
    constructor(public status: number, message?: string) {
        super(message);
        this.name = "ResponseError";
        Object.setPrototypeOf(this, new.target.prototype);
    }
}