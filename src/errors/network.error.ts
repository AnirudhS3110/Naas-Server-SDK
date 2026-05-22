import { BaseApiError } from "./base-api.error.js";

export class NetworkError extends BaseApiError
{
    constructor(message:string)
    {
        super(message,429)
        this.name = "NetworkError";
        Object.setPrototypeOf(this,NetworkError.prototype);
    }
}