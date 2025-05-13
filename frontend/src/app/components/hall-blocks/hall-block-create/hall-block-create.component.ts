import { HallService } from './../../../services/hall.service';
import { Component } from '@angular/core';
import { HallBlock } from '../../../models/Data/hall-block';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NotifyService } from '../../../services/notify.service';
import { Hall } from '../../../models/Data/hall';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { HallBlockService } from '../../../services/hall-block.service';

@Component({
  selector: 'app-hall-block-create',
  templateUrl: './hall-block-create.component.html',
  styleUrl: './hall-block-create.component.css'
})
export class HallBlockCreateComponent {
  halls:Hall[] =[];
  hallblocks:HallBlock ={};

  hallBlockForm:FormGroup = new FormGroup({
    blockName: new FormControl('', Validators.required),
    hallId: new FormControl('', Validators.required),
    createdDate: new FormControl(new Date(), Validators.required),
    createdUserId: new FormControl(undefined, Validators.required),
    modifiedDate: new FormControl(undefined),
    modifiedUserId: new FormControl(undefined)

});

constructor(
  private hallBlockSrv:HallBlockService,
  private notifySrv:NotifyService,
  private matDialog:MatDialog,
  private hallSrv:HallService
){}

  ngOnInit(): void {
    // Ensure the createdDate is set to the current date
    this.hallBlockForm.patchValue({
      createdDate: new Date()
    });

    forkJoin({
      halls: this.hallSrv.getAll(),
    }).subscribe({
      next: (result) => {
        this.halls = result.halls;
      },
      error: (error) => {
        console.error('Error fetching data:', error);
      }
    });
  }

get f(){
  return this.hallBlockForm.controls;
}

save(){
  if(this.hallBlockForm.invalid) return;
  Object.assign(this.hallblocks, this.hallBlockForm.value);
  console.log(this.hallblocks);
  this.hallBlockSrv.create(this.hallblocks)
  .subscribe({
    next:r=>{
      this.notifySrv.message('Data saved', 'DISMISS');
      this.hallblocks={};
      this.hallBlockForm.reset();
      this.hallBlockForm.markAsPristine();
      this.hallBlockForm.markAsUntouched();
       // Reset createdDate to current date after saving
       this.hallBlockForm.patchValue({ createdDate: new Date() });
    },
    error: err=>{
      this.notifySrv.message('Data save failed', 'DISMISS');
    }
  })

}

}
