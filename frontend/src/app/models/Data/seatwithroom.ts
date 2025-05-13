import { StudentRoom } from "./studentroom";

export interface SeatWithRoom{
  seatWithRoomId?:number;
  seatNumber?:number;
  roomFare?:number;
  isBooked?:boolean;
  createdDate?: Date | string;
  createdUserId?: number;
  modifiedDate?: Date | string;
  modifiedUserId?: number;
  roomId?: number;
  studentRooms?: StudentRoom[];

}
