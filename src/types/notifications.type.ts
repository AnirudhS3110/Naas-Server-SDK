// notifications.types.ts

export interface CreateNotificationBody{
    recepientId:string;

    title:string;

    body:string;

    type:
        | "MESSAGE_RECEIVED"
        | "SYSTEM_ANNOUNCEMENT"
        | "ACCOUNT_ALERT"
        | "MARKETPLACE_UPDATE";

    channel:("IN_APP"|"EMAIL"|"PUSH")[];

    metadata?:object;

    idempotencyKey:string;

    smartOrchestration:boolean;
}

export interface GetNotificationQuery{
    recipientId:string;

    limit?:number;

    page?:number;

    orderBy?:"asc"|"desc";
}

export interface UnreadCountQuery{
    recipientId:string;
}

export interface ReadNotificationParam{
    notificationId:string;
}

export interface ReadNotificationsBody{
    notificationIds:string[];
}

export interface RecipientBody{
    recipientId:string;
}