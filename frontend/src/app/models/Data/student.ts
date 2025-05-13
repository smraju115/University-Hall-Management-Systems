export interface Student{
  studentId?:number;
  studentName?:string;
  department?:string;
  registrationNumber?:number;
  rollNumber?:number;
  doB?:Date | string;
  gender?: string;
  session?: string;
  picture?: string;
  studentPhone?: string;
  studentAltPhone?: string;
  studentEmail?: string;
  permanentAddress?: string;
  presentAddress?: string;
  createdDate?: Date | string;
  createdUserId?: number;
  modifiedDate?: Date | string;
  modifiedUserId?: number;

}
