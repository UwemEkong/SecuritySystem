export interface Mediax {
    userid: number;
    islocal:boolean;
    isvideo:boolean;
    pathorkey: string;
    filename:string;
    location:string;
    timestamp:string;
    url?:string;
    isfavorite:boolean;
    shared?:boolean;
    title?:string;
    category?:string;
    views?:number;
    id?:number;
    deviceid:number;
}
