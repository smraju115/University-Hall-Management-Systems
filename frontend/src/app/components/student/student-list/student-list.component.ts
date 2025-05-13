import { Gender } from './../../../models/constants';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Student } from '../../../models/Data/student';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { StudentDataService } from '../../../services/student-data.service';
import { NotifyService } from '../../../services/notify.service';
import { throwError } from 'rxjs';
import { DeleteDialogComponent } from '../../common/delete-dialog/delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css'
})
export class StudentListComponent implements OnInit {
    picturePath ='http://localhost:5115/Pictures';
    student:Student[]=[];
    dataSource:MatTableDataSource<Student> = new MatTableDataSource(this.student);
    columns =['serial', 'picture', 'studentName', 'department', 'registrationNumber', 'rollNumber','doB', 'gender', 'session', 'actions']
      @ViewChild(MatSort, {static:false}) sort!:MatSort;
      @ViewChild(MatPaginator, {static:false}) paginator!:MatPaginator;
      constructor(
        private studentService:StudentDataService,
        private notifyService:NotifyService,
         private matDialog:MatDialog
      ){}


  deleteStudent(data:Student){
        this.matDialog.open(DeleteDialogComponent, {
          "width":"350px"

        }).afterClosed()
        .subscribe({
          next: result=>{
            if(result) {
              this.studentService.delete(<number>data.studentId)
              .subscribe({
                next: r=>{
                  this.dataSource.data = this.dataSource.data.filter(x=> x.studentId != data.studentId);
                }
              })
            }
          }
        })
      };

  ngOnInit(): void {
    this.studentService.getAll()
    .subscribe({
      next: r=>{
        this.student=r;
        this.dataSource.data = this.student;
        this.dataSource.sort= this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: err=>{
        this.notifyService.message("Failed to load Student Data", "Dismiss")
        throwError(()=> err);
      }
    })
  }


}

