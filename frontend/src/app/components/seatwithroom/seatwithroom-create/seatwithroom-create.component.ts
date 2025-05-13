import { Component } from '@angular/core';
import { SeatWithRoom } from '../../../models/Data/seatwithroom';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { forkJoin } from 'rxjs';
import { Room } from '../../../models/Data/room';
import { HallBlockService } from '../../../services/hall-block.service';
import { NotifyService } from '../../../services/notify.service';
import { RoomService } from '../../../services/room.service';
import { SeatwithroomService } from '../../../services/seatwithroom.service';

@Component({
  selector: 'app-seatwithroom-create',
  templateUrl: './seatwithroom-create.component.html',
  styleUrl: './seatwithroom-create.component.css'
})
export class SeatwithroomCreateComponent {
  rooms:Room[] =[];
  seatWithRooms:SeatWithRoom ={};

  seatWithRoomForm:FormGroup = new FormGroup({
    seatNumber: new FormControl(undefined, Validators.required),
    roomFare: new FormControl (undefined, Validators.required),
    roomId: new FormControl('', Validators.required),
    isBooked: new FormControl(undefined, Validators.required),
    createdDate: new FormControl(new Date(), Validators.required),
    createdUserId: new FormControl(undefined, Validators.required),
    modifiedDate: new FormControl(undefined),
    modifiedUserId: new FormControl(undefined)
  });

constructor(
  private seatWithRoomsSrv:SeatwithroomService,
  private notifySrv:NotifyService,
  private roomSrv:RoomService,

){}

get f(){
  return this.seatWithRoomForm.controls;
}
save(){
  if(this.seatWithRoomForm.invalid) return;
  Object.assign(this.seatWithRooms, this.seatWithRoomForm.value);
  console.log(this.seatWithRooms);
  this.seatWithRoomsSrv.create(this.seatWithRooms)
  .subscribe({
    next:r=>{
      this.notifySrv.message('Data saved', 'DISMISS');
      this.seatWithRooms={};
      this.seatWithRoomForm.reset();
      this.seatWithRoomForm.markAsPristine();
      this.seatWithRoomForm.markAsUntouched();
       // Reset createdDate to current date after saving
       this.seatWithRoomForm.patchValue({ createdDate: new Date() });
    },
    error: err=>{
      this.notifySrv.message('Data save failed', 'DISMISS');
    }
  })

}


 ngOnInit(): void {
    // Ensure the createdDate is set to the current date
    this.seatWithRoomForm.patchValue({
      createdDate: new Date()
    });

    forkJoin({
      rooms: this.roomSrv.getAll(),
    }).subscribe({
      next: (result) => {
        this.rooms = result.rooms;
      },
      error: (error) => {
        console.error('Error fetching data:', error);
      }
    });
  }


}
