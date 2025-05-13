import { HallBlock } from "./hall-block";

export interface Hall{
  hallId?:number;
  hallName?:string;
  hallType?:string;
  hallCapacity?:number;
  totalRooms?:number;
  yearInaugurated?:Date|string;
  createdDate?: Date | string;
  createdUserId?: number;
  modifiedDate?: Date | string;
  modifiedUserId?: number;
  hallBlocks?: HallBlock[];

}
