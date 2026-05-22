import { BaseApiError } from "./base-api.error.js";

export class AuthenticationError extends BaseApiError
{
    constructor(message:string)
    {
        super(message,401)
        this.name = "AuthenticationError";
        Object.setPrototypeOf(this,AuthenticationError.prototype);
    }
}