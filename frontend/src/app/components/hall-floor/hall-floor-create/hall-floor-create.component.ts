import { HallBlock } from './../../../models/Data/hall-block';
import { Component } from '@angular/core';
import { HallFloor } from '../../../models/Data/hall-floor';
import { Room } from '../../../models/Data/room';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HallFloorService } from '../../../services/hall-floor.service';
import { RoomService } from '../../../services/room.service';
import { MatDialog } from '@angular/material/dialog';
import { NotifyService } from '../../../services/notify.service';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { Hall } from '../../../models/Data/hall';
import { HallBlockService } from '../../../services/hall-block.service';

@Component({
  selector: 'app-hall-floor-create',
  templateUrl: './hall-floor-create.component.html',
  styleUrl: './hall-floor-create.component.css'
})
export class HallFloorCreateComponent {
  rooms:Room[] =[];
  hallBlocks:HallBlock[] =[];
  hallFloors:HallFloor ={};

  hallFloorForm:FormGroup = new FormGroup({
    floorNo: new FormControl(undefined, Validators.required),
    hallBlockId: new FormControl('', Validators.required),
    createdDate: new FormControl(new Date(), Validators.required),
    createdUserId: new FormControl(undefined, Validators.required),
    modifiedDate: new FormControl(undefined),
    modifiedUserId: new FormControl(undefined)
  });

constructor(
  private hallFloorSrv:HallFloorService,
  private notifySrv:NotifyService,
  private matDialog:MatDialog,
  private roomSrv:RoomService,
  private hallBlockSrv:HallBlockService,

){}

get f(){
  return this.hallFloorForm.controls;
}
save(){
  if(this.hallFloorForm.invalid) return;
  Object.assign(this.hallFloors, this.hallFloorForm.value);
  console.log(this.hallFloors);
  this.hallFloorSrv.create(this.hallFloors)
  .subscribe({
    next:r=>{
      this.notifySrv.message('Data saved', 'DISMISS');
      this.hallFloors={};
      this.hallFloorForm.reset();
      this.hallFloorForm.markAsPristine();
      this.hallFloorForm.markAsUntouched();
       // Reset createdDate to current date after saving
       this.hallFloorForm.patchValue({ createdDate: new Date() });
    },
    error: err=>{
      this.notifySrv.message('Data save failed', 'DISMISS');
    }
  })

}


 ngOnInit(): void {
    // Ensure the createdDate is set to the current date
    this.hallFloorForm.patchValue({
      createdDate: new Date()
    });

    forkJoin({
      hallBlocks: this.hallBlockSrv.getAll(),
    }).subscribe({
      next: (result) => {
        this.hallBlocks = result.hallBlocks;
      },
      error: (error) => {
        console.error('Error fetching data:', error);
      }
    });
  }



}
