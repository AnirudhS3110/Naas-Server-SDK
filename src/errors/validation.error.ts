import { BaseApiError } from "./base-api.error.js";

export class ValidationError extends BaseApiError
{
    constructor(message:string)
    {
        super(message,422)
        this.name = "QuotaExceededError";
        Object.setPrototypeOf(this,BaseApiError);
    }
}