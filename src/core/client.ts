import { HttpClient } from "http/http-client.js";
import { NotifyFlowDevices } from "resources/devices/devices.resource.js";
import { NotificationsResource } from "resources/notificaitons/notifications.resource.js";

export class NotifyFlowServer{
    private apiKey:string;
    private baseUrl?:string;
    private httpClient:HttpClient;
    public notifications:NotificationsResource;
    public devices:NotifyFlowDevices;
    
    constructor(apiKey:string){
        this.apiKey = apiKey;
        this.baseUrl = undefined;
        this.httpClient =  new HttpClient({apiKey:apiKey,baseUrl:this.baseUrl})
        this.notifications = new NotificationsResource(this.httpClient);
        this.devices = new NotifyFlowDevices(this.httpClient)
    }

}