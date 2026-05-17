import { DEFAULT_BASE_URL } from "core/constants.js";
import { SDKConfig } from "../core/config.js"


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
            const result = await fetch(url,{
                method:method,
                headers:{
                            "Content-Type":"application/json",
                            "x-api-key":this.apiKey
                        },
                body: body ? JSON.stringify(body) : undefined
            });
            const jsonData = await result.json();

            if(!result.ok)
                throw new Error(jsonData?.message ?? `Request failed with status ${result.status}`);
            return jsonData;
        }
        catch(e)
        {
            if(e instanceof Error)
                throw e;
            throw new Error("Unkown network error");
        }
    }

    async get(path:string)
    {
        this.request("GET",path);
    }

    async post(path:string,body:unknown)
    {
        this.request("POST",path,body);
    }

    async put(path:string,body:unknown)
    {
        this.request("PUT",path,body);
    }

    async delete(path:string)
    {
        this.request("DELETE",path);
    }

    async patch(path:string,body?:unknown)
    {
        this.request("PATCH",path,body);
    }
}