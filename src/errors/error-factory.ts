import { AuthenticationError } from "./auth.error.js";
import { BaseApiError } from "./base-api.error.js";
import { QuotaExceededError } from "./quota-exceeded.error.js";
import { ValidationError } from "./validation.error.js";

export function createAPIError(
    statusCode:number,
    message:string
)
{
    switch(statusCode)
    {
        case 401:
            return new AuthenticationError(message);

        case 429:
            return new QuotaExceededError(message);
        
        case 422:
            return new ValidationError(message)

        default:
            return new BaseApiError(message,statusCode);
    }
}