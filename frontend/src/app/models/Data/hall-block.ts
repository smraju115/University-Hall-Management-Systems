import { Hall } from "./hall";

export interface HallBlock{
  hallBlockId?:number;
  blockName?:string;
  hallId?:number;
  createdDate?: Date | string;
  createdUserId?: number;
  modifiedDate?: Date | string;
  modifiedUserId?: number;
  halls?:Hall[];
}
