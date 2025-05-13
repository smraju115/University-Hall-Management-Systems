import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CustomRequest } from '../../../models/Data/request';
import { NotifyService } from '../../../services/notify.service';
import { RequestService } from '../../../services/request.service';

@Component({
  selector: 'app-request-add',
  templateUrl: './request-add.component.html',
  styleUrl: './request-add.component.css'
})
export class RequestAddComponent implements OnInit{
  requests: CustomRequest = {};
  reqForm:FormGroup = new FormGroup({
    requestType: new FormControl('', Validators.required),
    requestDetails: new FormControl('', Validators.required),
    createdDate: new FormControl(new Date(), Validators.required),
    createdUserId: new FormControl(undefined, Validators.required),
    modifiedDate: new FormControl(undefined),
    modifiedUserId: new FormControl(undefined)
  
  });
  
  constructor(
    private reqSrv:RequestService,
    private notifySrv:NotifyService,
    private matDialog:MatDialog
  ){}
  
    ngOnInit(): void {
      //this.createdDate = new Date();
      // Ensure the createdDate is set to the current date
      this.reqForm.patchValue({
        createdDate: new Date()
      });
    }
  
  get f(){
    return this.reqForm.controls;
  }
  
  save(){
    if(this.reqForm.invalid) return;
    Object.assign(this.requests, this.reqForm.value);
    console.log(this.requests);
    this.reqSrv.create(this.requests)
    .subscribe({
      next:r=>{
        this.notifySrv.message('Data saved', 'DISMISS');
        this.requests={};
        this.reqForm.reset();
        this.reqForm.markAsPristine();
        this.reqForm.markAsUntouched();
         // Reset createdDate to current date after saving
         this.reqForm.patchValue({ createdDate: new Date() });
      },
      error: err=>{
        this.notifySrv.message('Data save failed', 'DISMISS');
      }
    })
  
  }
  
}
