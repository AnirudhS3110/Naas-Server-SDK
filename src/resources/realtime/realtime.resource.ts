import { HttpClient } from "http/http-client.js";
import { GenerateToken } from "types/realtime.type.js";

export class NotifyFlowRealtime
{
    private readonly base = "auth";

    private generatePath(path:string)
    {
        return `${this.base}/${path}`
    }

    constructor(private httpClientObj:HttpClient){}

    async generateToken(body:GenerateToken):Promise<string>
    {
        const {tempRealtimetoken} = await this.httpClientObj.post(this.generatePath("real-time"),body);
        return tempRealtimetoken;
    }
}