import { Room } from "./room";

export interface HallFloor{
  hallFloorId?:number;
  floorNo?:number;
  createdDate?: Date | string;
  createdUserId?: number;
  modifiedDate?: Date | string;
  modifiedUserId?: number;
  hallBlockId?:number;
  rooms?:Room[];
}
