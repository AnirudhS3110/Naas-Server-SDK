import { HttpClient } from "http/http-client.js";
import { NotificationsResource } from "resources/notificaitons/notifications.resource.js";

export class Naas{
    private apiKey:string;
    private baseUrl?:string;
    private httpClient:HttpClient;
    public notifications:NotificationsResource;
    
    constructor(apiKey:string){
        this.apiKey = apiKey;
        this.baseUrl = undefined;
        this.httpClient =  new HttpClient({apiKey:apiKey,baseUrl:this.baseUrl})
        this.notifications = new NotificationsResource(this.httpClient)
    }
}