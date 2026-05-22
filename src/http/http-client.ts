import { DEFAULT_BASE_URL } from "core/constants.js";
import { SDKConfig } from "../core/config.js"
import { createAPIError } from "errors/error-factory.js";
import { NetworkError } from "errors/network.error.js";
import { TimeOutError } from "errors/timeout.error.js";


export class HttpClient{

    private apiKey:string;
    private baseUrl:string;

    constructor(config:SDKConfig,private timeout:number=15000)
    {
        this.apiKey = config.apiKey;
        this.baseUrl = DEFAULT_BASE_URL;
    }

   

    

    private async request(method:"GET"|"POST"|"PUT"|"PATCH"|"DELETE",path:string,body?:unknown)
    {
        const url = `${this.baseUrl}/${path}`;

        const controller = new AbortController();

        const timeoutId = setTimeout(()=>{controller.abort();},this.timeout);

        try{
            const response = await fetch(url,{
                method:method,
                headers:{
                            "Content-Type":"application/json",
                            "x-api-key":this.apiKey
                        },
                body: body !== undefined  ? JSON.stringify(body) : undefined,
                signal:controller.signal
            });

            clearTimeout(timeoutId);

            let jsonData;

            try{
                 jsonData = await response.json();
            }
            catch{
                jsonData = null;
            }

            if(!response.ok)
                throw createAPIError(response.status,jsonData?.message ?? "unknown error")
            return jsonData;
        }
        catch(e)
        {
            clearTimeout(timeoutId);

            if(e instanceof Error && e.name === "AbortError")
            {
             throw new TimeOutError("NotifyFlow Request Timed Out");
            }

            if(e instanceof Error)
                throw e;

            throw new NetworkError("Failed to connect to NotifyFlow API");
        }
    }

    async get(path:string)
    {
        return await this.request("GET",path);
    }

    async post(path:string,body:unknown)
    {
        return await this.request("POST",path,body);
    }

    async put(path:string,body:unknown)
    {
        return await this.request("PUT",path,body);
    }

    async delete(path:string)
    {
        return await this.request("DELETE",path);
    }

    async patch(path:string,body?:unknown)
    {
        return await this.request("PATCH",path,body);
    }
}