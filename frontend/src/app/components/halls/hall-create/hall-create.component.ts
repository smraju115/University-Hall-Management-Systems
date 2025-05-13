import { Component, OnInit } from '@angular/core';
import { Hall } from '../../../models/Data/hall';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { HallService } from '../../../services/hall.service';
import { NotifyService } from '../../../services/notify.service';

@Component({
  selector: 'app-hall-create',
  templateUrl: './hall-create.component.html',
  styleUrl: './hall-create.component.css'
})
export class HallCreateComponent implements OnInit {

halls:Hall ={};
hallForm:FormGroup = new FormGroup({
  hallName: new FormControl('', Validators.required),
  hallType: new FormControl('', Validators.required),
  hallCapacity: new FormControl(undefined, Validators.required),
  totalRooms: new FormControl(undefined, Validators.required),
  yearInaugurated: new FormControl(undefined, Validators.required),
  createdDate: new FormControl(new Date(), Validators.required),
  createdUserId: new FormControl(undefined, Validators.required),
  modifiedDate: new FormControl(undefined),
  modifiedUserId: new FormControl(undefined)

});

constructor(
  private hallSrv:HallService,
  private notifySrv:NotifyService,
  private matDialog:MatDialog
){}

  ngOnInit(): void {
    //this.createdDate = new Date();
    // Ensure the createdDate is set to the current date
    this.hallForm.patchValue({
      createdDate: new Date()
    });
  }

get f(){
  return this.hallForm.controls;
}

save(){
  if(this.hallForm.invalid) return;
  Object.assign(this.halls, this.hallForm.value);
  console.log(this.halls);
  this.hallSrv.create(this.halls)
  .subscribe({
    next:r=>{
      this.notifySrv.message('Data saved', 'DISMISS');
      this.halls={};
      this.hallForm.reset();
      this.hallForm.markAsPristine();
      this.hallForm.markAsUntouched();
       // Reset createdDate to current date after saving
       this.hallForm.patchValue({ createdDate: new Date() });
    },
    error: err=>{
      this.notifySrv.message('Data save failed', 'DISMISS');
    }
  })

}


}
