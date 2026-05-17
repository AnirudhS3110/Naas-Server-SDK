import { HttpClient } from "http/http-client.js";
import { CreateNotificationBody, GetNotificationQuery, ReadNotificationParam, ReadNotificationsBody, RecipientBody, UnreadCountQuery } from "types/notifications.type.js";

export class NotificationsResource
{
    private base = "notifications";
    constructor(private httpClient:HttpClient){}

    private buildQueryParameters(query:Record<string,any>)
    {
        const params = new URLSearchParams();
        Object.entries(query).forEach(([key,value])=>{
                                                    if(value !== undefined && value !== null)
                                                        params.append(key,String(value));
                                                    });
        return params.toString();
    }

    async createNotification(body:CreateNotificationBody)
    {
        await this.httpClient.post(`${this.base}/`,body)
    }

    async getNotifications(query:GetNotificationQuery)
    {
        const queryParams = this.buildQueryParameters(query);
        await this.httpClient.get(`${this.base}/?${queryParams}`);
    }

    async markNotificationAsReadById(param:ReadNotificationParam)
    {
        return await this.httpClient.patch(`${this.base}/${param.notificationId}/read`);
    }

    async markMultipleNotificationsAsReadById(body:ReadNotificationsBody)
    {
        await this.httpClient.patch(`${this.base}/read`,body)
    }

    async markAllNotificationsAsReadByRecipientId(body:RecipientBody)
    {
        await this.httpClient.patch(`${this.base}/all-read`,body);
    }

    async getUnreadCountByRecipientId(query:UnreadCountQuery)
    {
        await this.httpClient.get(`${this.base}/unread?recipientId=${query.recipientId}`)
    }
}