import { BaseApiError } from "./base-api.error.js";

export class TimeOutError extends BaseApiError
{
    constructor(message:string)
    {
        super(message,429)
        this.name = "TimeOutError";
        Object.setPrototypeOf(this,TimeOutError.prototype);
    }
}