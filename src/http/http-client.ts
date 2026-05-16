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
}