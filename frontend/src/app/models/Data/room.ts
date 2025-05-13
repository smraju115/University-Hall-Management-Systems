export interface Room{
  roomId?:number;
  roomNo?:string;
  roomType?:string;
  createdDate?: Date | string;
  createdUserId?: number;
  modifiedDate?: Date | string;
  modifiedUserId?: number;
  hallFloorId?:number;
} 
