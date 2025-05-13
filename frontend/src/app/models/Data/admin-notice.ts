export interface AdminNotice{
  noticeId?:number;
  title?:string;
  noticeFile?:string;
  createdDate?: Date | string;
  createdUserId?: number;
  modifiedDate?: Date | string;
  modifiedUserId?: number;

}
