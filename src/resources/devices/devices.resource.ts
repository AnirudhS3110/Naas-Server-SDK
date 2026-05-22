import { HttpClient } from "http/http-client.js";
import { RegisterDeviceBodyType, RegisterDeviceResponse } from "types/register-device.type.js";
import { UnregisterDeviceResponse, UnregisterParam } from "types/unregister.types.js";

export class NotifyFlowDevices
{
    private readonly base = "notification-devices";

    private generatePath(path:string)
    {
        return `${this.base}/${path}`
    }

    constructor(private httpClientObj:HttpClient){}

    async register(body:RegisterDeviceBodyType):Promise<RegisterDeviceResponse>
    {
        return await this.httpClientObj.post(this.generatePath("register"),body);
    }

    async refreshPushToken(body:{fcmToken:string,deviceId:string}):Promise<void>
    {
        await this.httpClientObj.post(this.generatePath("refresh"),body)
    }

    async unregister(body:UnregisterParam):Promise<UnregisterDeviceResponse>
    {
        return await this.httpClientObj.patch(this.generatePath(`deactivate`),body);
    }
    
}