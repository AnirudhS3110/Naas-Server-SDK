import { DEFAULT_BASE_URL } from "core/constants.js";
import { SDKConfig } from "../core/config.js"
import { createAPIError } from "errors/error-factory.js";


export class HttpClient{

    private apiKey:string;
    private baseUrl:string;

    constructor(config:SDKConfig)
    {
        this.apiKey = config.apiKey;
        this.baseUrl = DEFAULT_BASE_URL;
    }

    private async request(method:"GET"|"POST"|"PUT"|"PATCH"|"DELETE",path:string,body?:unknown)
    {
        const url = `${this.baseUrl}/${path}`;
        try{
            const response = await fetch(url,{
                method:method,
                headers:{
                            "Content-Type":"application/json",
                            "x-api-key":this.apiKey
                        },
                body: body !== undefined || method !== "GET" ? JSON.stringify(body) : undefined
            });
            const jsonData = await response.json();

            if(!response.ok)
                throw createAPIError(response.status,jsonData?.message ?? "unknown error")
            return jsonData;
        }
        catch(e)
        {
            if(e instanceof Error)
            {
             throw e
            }

            throw new Error("Unkown network error");
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