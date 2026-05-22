export class BaseApiError extends Error
{
    public readonly statusCode:number;
    public readonly details?:unknown;

    constructor(message:string,statusCode:number=500){
        super(message);
        this.statusCode = statusCode;
        Object.setPrototypeOf(this,BaseApiError.prototype)
    }
}



