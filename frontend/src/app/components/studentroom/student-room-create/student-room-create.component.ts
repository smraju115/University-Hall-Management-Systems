import { SeatwithroomService } from './../../../services/seatwithroom.service';
import { StudentroomService } from './../../../services/studentroom.service';
import { Component } from '@angular/core';
import { Student } from '../../../models/Data/student';
import { StudentRoom } from '../../../models/Data/studentroom';
import { StudentDataService } from '../../../services/student-data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { SeatWithRoom } from '../../../models/Data/seatwithroom';
import { NotifyService } from '../../../services/notify.service';

@Component({
  selector: 'app-student-room-create',
  templateUrl: './student-room-create.component.html',
  styleUrl: './student-room-create.component.css'
})
export class StudentRoomCreateComponent {
  students:Student[] =[];
  seatWithRooms:SeatWithRoom[] =[];
  studentRooms:StudentRoom ={};

  studentRoomForm:FormGroup = new FormGroup({
    fromDate: new FormControl(undefined, Validators.required),
    toDate: new FormControl (undefined, Validators.required),
    studentId: new FormControl('', Validators.required),
    seatWithRoomId: new FormControl('', Validators.required),
    createdDate: new FormControl(new Date(), Validators.required),
    createdUserId: new FormControl(undefined, Validators.required),
    modifiedDate: new FormControl(undefined),
    modifiedUserId: new FormControl(undefined)
  });

constructor(
  private studentRoomsSrv:StudentroomService,
  private notifySrv:NotifyService,
  private seatWithRoomsSrv:SeatwithroomService,
  private studentsSrv:StudentDataService

){}

get f(){
  return this.studentRoomForm.controls;
}
save(){
  if(this.studentRoomForm.invalid) return;
  Object.assign(this.studentRooms, this.studentRoomForm.value);
  console.log(this.studentRooms);
  this.studentRoomsSrv.create(this.studentRooms)
  .subscribe({
    next:r=>{
      this.notifySrv.message('Data saved', 'DISMISS');
      this.studentRooms={};
      this.studentRoomForm.reset();
      this.studentRoomForm.markAsPristine();
      this.studentRoomForm.markAsUntouched();
       // Reset createdDate to current date after saving
       this.studentRoomForm.patchValue({ createdDate: new Date() });
    },
    error: err=>{
      this.notifySrv.message('Data save failed', 'DISMISS');
    }
  })

}


 ngOnInit(): void {
    // Ensure the createdDate is set to the current date
    this.studentRoomForm.patchValue({
      createdDate: new Date()
    });

    forkJoin({
      students: this.studentsSrv.getAll(),
      seatWithRooms: this.seatWithRoomsSrv.getAll()
    }).subscribe({
      next: (result) => {
        this.students = result.students;
        this.seatWithRooms = result.seatWithRooms;
      },
      error: (error) => {
        console.error('Error fetching data:', error);
      }
    });
  }


}
