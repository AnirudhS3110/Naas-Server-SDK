export interface RegisterDeviceBodyType {recipientId:string,deviceId:string,fcmToken:string,platformType:string}

export interface RegisterDeviceResponse
{
    success:boolean;
}