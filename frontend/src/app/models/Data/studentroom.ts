export interface StudentRoom{
  studentRoomId?:number;
  fromDate?:Date|string;
  toDate?:Date|string;
  createdDate?: Date | string;
  createdUserId?: number;
  modifiedDate?: Date | string;
  modifiedUserId?: number;
  studentId?:number;
  seatWithRoomId?: number;
  studentName?: string;
  seatNumber?: number;

}
