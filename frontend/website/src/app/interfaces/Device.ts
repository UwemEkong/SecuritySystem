export interface Device{
    id?:number | undefined,
    userid:number | undefined,
    macaddress:string,
    name:string,
    location:string,
    active?:boolean,
    ip?:string // Field only exists on frontend since the jetson ip is not static.
    defaultdevice?:boolean
    motionactive?:boolean
}