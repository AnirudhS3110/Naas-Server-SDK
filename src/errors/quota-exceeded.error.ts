import { BaseApiError } from "./base-api.error.js";

export class QuotaExceededError extends BaseApiError
{
    constructor(message:string)
    {
        super(message,429)
        this.name = "QuotaExceededError";
        Object.setPrototypeOf(this,QuotaExceededError.prototype);
    }
}