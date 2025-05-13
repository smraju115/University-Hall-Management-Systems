import { HallBlock } from './../../../models/Data/hall-block';
import { Student } from './../../../models/Data/student';
import { Component, OnInit, ViewChild } from '@angular/core';
import { StudentRoom } from '../../../models/Data/studentroom';
import { StudentroomService } from '../../../services/studentroom.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NotifyService } from '../../../services/notify.service';
import { SeatWithRoom } from '../../../models/Data/seatwithroom';
import { StudentDataService } from '../../../services/student-data.service';
import { SeatwithroomService } from '../../../services/seatwithroom.service';
import { forkJoin } from 'rxjs';
import { DeleteDialogComponent } from '../../common/delete-dialog/delete-dialog.component';
import { Room } from '../../../models/Data/room';
import { HallFloor } from '../../../models/Data/hall-floor';
import { Hall } from '../../../models/Data/hall';
import { StudentRoomDetailsDailogComponent } from '../../common/student-room-details-dailog/student-room-details-dailog.component';

@Component({
  selector: 'app-student-room-list',
  templateUrl: './student-room-list.component.html',
  styleUrl: './student-room-list.component.css'
})
export class StudentRoomListComponent implements OnInit {
  students:Student[]=[];
  rooms: Room[]=[];
  hallFloors:HallFloor[]=[];
  hallBlocks:HallBlock[]=[];
  halls:Hall[]=[];
  private seatWithRooms: SeatWithRoom[]=[];
  studentRooms: StudentRoom[] = [];
  dataSource:MatTableDataSource<StudentRoom> = new MatTableDataSource(this.studentRooms);
  columns=['serial', 'fromDate', 'toDate', 'studentName', 'seatNumber', 'createdDate','createdUserId', 'actions'];
  @ViewChild(MatSort, {static:false}) sort!:MatSort;
  @ViewChild(MatPaginator, {static:false}) paginator!:MatPaginator;

  constructor(
    private studentRoomsSrv:StudentroomService,
    private notifySrv:NotifyService,
    private studentSrv: StudentDataService,
    private seatWithRoomsSrv: SeatwithroomService,
    private matDialog:MatDialog
  ){}

deleteStudentRoom(data:StudentRoom){
  this.matDialog.open(DeleteDialogComponent, {
    "width":"350px"

  }).afterClosed()
  .subscribe({
    next: result=>{
      if(result) {
        this.studentRoomsSrv.delete(<number>data.studentRoomId)
        .subscribe({
          next: r=>{
            this.dataSource.data = this.dataSource.data.filter(x=> x.studentRoomId != data.studentRoomId);
          }
        })
      }
    }
  })
}

  ngOnInit(): void {
    this.studentRoomsSrv.getAll().subscribe({
      next: (r: StudentRoom[]) => {
        this.studentRooms = r;
        this.dataSource.data = this.studentRooms;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        this.notifySrv.message('Failed to load data', 'DISMISS');
        console.log(err.message || err);
      },
    });


    /* forkJoin({
          students: this.studentSrv.getAll(),
          seatWithRooms: this.seatWithRoomsSrv.getAll()
        }).subscribe({
          next: (result) => {
            this.students = result.students;
            this.seatWithRooms = result.seatWithRooms;
          },
          error: (error) => {
            console.error('Error fetching data:', error);
          }
        }); */

        forkJoin({
          students: this.studentSrv.getAll(),
          seatWithRooms: this.seatWithRoomsSrv.getAll()
        }).subscribe({
          next: (result) => {
            this.students = result.students;
            this.seatWithRooms = result.seatWithRooms;

            // Map StudentId to StudentName
            this.studentRooms.forEach((room) => {
              const student = this.students.find(s => s.studentId === room.studentId);
              if (student) {
                room.studentName = student.studentName; // Add a new property
              }

              const seatWithRoom = this.seatWithRooms.find(s => s.seatWithRoomId === room.seatWithRoomId);
              if (seatWithRoom) {
                room.seatNumber = seatWithRoom.seatNumber; // Add a new property
              }
            });
          },
          error: (error) => {
            console.error('Error fetching data:', error);
          }
        });


  }

  viewDetails(studentRoom: StudentRoom): void {
    const student = this.students.find(s => s.studentId === studentRoom.studentId);
    const seatWithRoom = this.seatWithRooms.find(s => s.seatWithRoomId === studentRoom.seatWithRoomId);

    if (student && seatWithRoom) {
      const room = this.rooms.find(r => r.roomId === seatWithRoom.roomId);
      const hallFloor = this.hallFloors.find(f => f.hallFloorId === room?.hallFloorId);
      const hallBlock = this.hallBlocks.find(b => b.hallBlockId === hallFloor?.hallBlockId);
      const hall = this.halls.find(h => h.hallId === hallBlock?.hallId);

      const details = {
        studentName: student.studentName,
        hallName: hall?.hallName,
        blockName: hallBlock?.blockName,
        roomNo: room?.roomNo,
        roomFare: seatWithRoom.roomFare,
        fromDate: studentRoom.fromDate,
        toDate: studentRoom.toDate
      };


      this.matDialog.open(StudentRoomDetailsDailogComponent, {
        width: '400px',
        data: details
      });
    } else {
      console.error('Data missing for selected student room');
    }
  }





}
