import { Component, OnInit } from '@angular/core';
import { Room } from '../../../models/Data/room';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { forkJoin } from 'rxjs';
import { HallBlockService } from '../../../services/hall-block.service';
import { HallService } from '../../../services/hall.service';
import { NotifyService } from '../../../services/notify.service';
import { RoomService } from '../../../services/room.service';
import { HallFloor } from '../../../models/Data/hall-floor';
import { HallFloorService } from '../../../services/hall-floor.service';

@Component({
  selector: 'app-room-create',
  templateUrl: './room-create.component.html',
  styleUrl: './room-create.component.css'
})
export class RoomCreateComponent implements OnInit {
  hallFloors:HallFloor[] =[];
  rooms:Room ={};
  roomForm:FormGroup = new FormGroup({
    roomNo: new FormControl('', Validators.required),
    roomType: new FormControl('', Validators.required),
    hallFloorId: new FormControl(undefined, Validators.required),
    createdDate: new FormControl(new Date(), Validators.required),
    createdUserId: new FormControl(undefined, Validators.required),
    modifiedDate: new FormControl(undefined),
    modifiedUserId: new FormControl(undefined)

});

constructor(
  private roomSrv:RoomService,
  private notifySrv:NotifyService,
  private matDialog:MatDialog,
  private hallFloorSrv: HallFloorService
){}

  ngOnInit(): void {
    // Ensure the createdDate is set to the current date
    this.roomForm.patchValue({
      createdDate: new Date()
    });
    forkJoin({
      hallFloors: this.hallFloorSrv.getAll(),
    }).subscribe({
      next: (result) => {
        this.hallFloors = result.hallFloors;
      },
      error: (error) => {
        console.error('Error fetching data:', error);
      }
    });
  }


get f(){
  return this.roomForm.controls;
}

save(){
  if(this.roomForm.invalid) return;
  Object.assign(this.rooms, this.roomForm.value);
  console.log(this.rooms);
  this.roomSrv.create(this.rooms)
  .subscribe({
    next:r=>{
      this.notifySrv.message('Data saved', 'DISMISS');
      this.rooms={};
      this.roomForm.reset();
      this.roomForm.markAsPristine();
      this.roomForm.markAsUntouched();
       // Reset createdDate to current date after saving
       this.roomForm.patchValue({ createdDate: new Date() });
    },
    error: err=>{
      this.notifySrv.message('Data save failed', 'DISMISS');
    }
  })

}

}
