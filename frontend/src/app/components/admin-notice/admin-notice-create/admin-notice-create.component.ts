import { Component, OnInit } from '@angular/core';
import { AdminNotice } from '../../../models/Data/admin-notice';
import { DatePipe } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AdminNoticeService } from '../../../services/admin-notice.service';
import { NotifyService } from '../../../services/notify.service';

@Component({
  selector: 'app-admin-notice-create',
  templateUrl: './admin-notice-create.component.html',
  styleUrl: './admin-notice-create.component.css'
})
export class AdminNoticeCreateComponent implements OnInit {
  adminNotice:AdminNotice ={};
  noticeFile:File = null!;
  adminNoticeForm:FormGroup=new FormGroup({
    title: new FormControl('', Validators.required),
    noticeFile: new FormControl('', Validators.required),
    createdDate: new FormControl(new Date(), Validators.required),
    createdUserId: new FormControl(undefined, Validators.required),
    modifiedDate: new FormControl(undefined),
    modifiedUserId: new FormControl(undefined),

  });
   constructor(
    private adminNoticeSrv:AdminNoticeService,
    private notifyService:NotifyService,
    private datePipe:DatePipe

  ){}

  get f(){
    return this.adminNoticeForm.controls;
  }
  save(){
    if(this.adminNoticeForm.invalid) return;
    Object.assign(this.adminNotice, this.adminNoticeForm.value);
    const reader = new FileReader();
    reader.onload =(e:any)=>{
      this.adminNoticeSrv.uploadNoticeFiles(this.noticeFile)
      .subscribe({
        next: r=>{
          this.insert();
        },
        error: err=>{
          this.notifyService.message("Failed to upload file", "Dismiss");
        }
      })
    }
    reader.readAsArrayBuffer(this.noticeFile)

  }


  insert(){
    this.adminNoticeSrv.create(this.adminNotice)
    .subscribe({
      next: r=>{
        this.notifyService.message("Data Saved", "Dismiss");
        this.adminNotice={};
        this.adminNoticeForm.reset();
        this.adminNoticeForm.markAsPristine();
        this.adminNoticeForm.markAsUntouched();
         // Reset createdDate to current date after saving
       this.adminNoticeForm.patchValue({ createdDate: new Date() });
      },
      error: err=>{
        this.notifyService.message("Failed to Saved", "Dismiss");
      }

    })
  }


  pictureChanged(event:any){
    if(event.target.files.length){
      this.noticeFile = event.target.files[0];
      this.adminNoticeForm.patchValue({
        noticeFile: this.noticeFile.name
      })
    }
  }

  ngOnInit(): void {
    this.adminNoticeForm.patchValue({
      createdDate: new Date()
    });
  }
}
