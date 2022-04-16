export interface Session {
    owner:string;
    reservations:Reservation[];
    createdAt:number;
    description:string;
}

export interface Reservation {
    name:string;
    id:string;
    itemId:number;
    modifiedAt:number;
}