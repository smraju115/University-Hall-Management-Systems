import { Student } from './../../../models/Data/student';
import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/cdk/stepper';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, map, throwError } from 'rxjs';
import { StudentDataService } from '../../../services/student-data.service';
import { NotifyService } from '../../../services/notify.service';
import { Gender } from '../../../models/constants';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-student-add',
  templateUrl: './student-add.component.html',
  styleUrl: './student-add.component.css'
})
export class StudentAddComponent implements OnInit {

  student:Student ={};
  //genderOptions:{label:string, value:number}[]=[];
  picture:File = null!;
  stdForm:FormGroup=new FormGroup({
    studentName: new FormControl('', Validators.required),
    department: new FormControl('', Validators.required),
    registrationNumber: new FormControl(undefined, Validators.required),
    rollNumber: new FormControl(undefined, Validators.required),
    doB: new FormControl(undefined, Validators.required),
    gender: new FormControl(undefined, Validators.required),
    session: new FormControl(undefined, Validators.required),
    picture: new FormControl('', Validators.required),
    studentPhone: new FormControl('', Validators.required),
    studentAltPhone: new FormControl(''),
    studentEmail: new FormControl('', Validators.required),
    permanentAddress: new FormControl('', Validators.required),
    presentAddress: new FormControl('', Validators.required),
    createdDate: new FormControl(undefined, Validators.required),
    createdUserId: new FormControl(undefined, Validators.required),
    modifiedDate: new FormControl(undefined),
    modifiedUserId: new FormControl(undefined),

  });
   constructor(
    private studentService:StudentDataService,
    private notifyService:NotifyService,
    private datePipe:DatePipe

  ){}


  get f(){
    return this.stdForm.controls;
  }
  save(){
    if(this.stdForm.invalid) return;
    Object.assign(this.student, this.stdForm.value);
    const reader = new FileReader();
    reader.onload =(e:any)=>{
      this.studentService.uploadPicture(this.picture)
      .subscribe({
        next: r=>{
          this.student.picture = r.newFileName;
          this.insert();
        },
        error: err=>{
          this.notifyService.message("Failed to upload picture", "Dismiss");
        }
      })
    }
    reader.readAsArrayBuffer(this.picture)
    this.student.doB = <string>this.datePipe.transform(this.student.doB, "yyyy-MM-dd")
    //this.student.doB = this.datePipe.transform(this.student.doB, 'yyyy-MM-dd');

   /*  this.student.createdDate = <string>this.datePipe.transform(this.student.createdDate, "yyyy-MM-dd")
    this.student.modifiedDate = <string>this.datePipe.transform(this.student.modifiedDate, "yyyy-MM-dd") */
    //console.log(this.student)
  }
  insert(){
    this.studentService.create(this.student)
    .subscribe({
      next: r=>{
        this.notifyService.message("Data Saved", "Dismiss");
        this.student={};
        this.stdForm.reset();
        this.stdForm.markAsPristine();
        this.stdForm.markAsUntouched();
      },
      error: err=>{
        this.notifyService.message("Failed to Saved", "Dismiss");
      }

    })
  }

  pictureChanged(event:any){

    if(event.target.files.length){
      this.picture = event.target.files[0];
      this.stdForm.patchValue({
        picture: this.picture.name
      })
    }
  }
  ngOnInit(): void {
    // Object.keys(Gender).filter(
    //   (type) => isNaN(<any>type) && type !== 'values'
    // ).forEach((v: any, i) => {
    //   this.genderOptions.push({ label: v, value: Number(Gender[v]) });
    // });
  }
}
