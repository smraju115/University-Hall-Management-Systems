import { Component, OnInit, ViewChild } from '@angular/core';
import { SeatWithRoom } from '../../../models/Data/seatwithroom';
import { SeatwithroomService } from '../../../services/seatwithroom.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NotifyService } from '../../../services/notify.service';
import { DeleteDialogComponent } from '../../common/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-seatwithroom-list',
  templateUrl: './seatwithroom-list.component.html',
  styleUrl: './seatwithroom-list.component.css'
})
export class SeatwithroomListComponent implements OnInit {
  seatWithRooms: SeatWithRoom[] = [];
  dataSource:MatTableDataSource<SeatWithRoom> = new MatTableDataSource(this.seatWithRooms);
  columns=['serial', 'seatNumber', 'roomFare', 'roomId', 'isBooked', 'createdDate','createdUserId', 'actions'];
  @ViewChild(MatSort, {static:false}) sort!:MatSort;
  @ViewChild(MatPaginator, {static:false}) paginator!:MatPaginator;

  constructor(
    private seatWithRoomsSrv:SeatwithroomService,
    private notifySrv:NotifyService,
    private matDialog:MatDialog
  ){}

deleteSeatwithRoom(data:SeatWithRoom){
        this.matDialog.open(DeleteDialogComponent, {
          "width":"350px"

        }).afterClosed()
        .subscribe({
          next: result=>{
            if(result) {
              this.seatWithRoomsSrv.delete(<number>data.seatWithRoomId)
              .subscribe({
                next: r=>{
                  this.dataSource.data = this.dataSource.data.filter(x=> x.seatWithRoomId != data.seatWithRoomId);
                }
              })
            }
          }
        })
      };

  ngOnInit(): void {
    this.seatWithRoomsSrv.getAll().subscribe({
      next: (r: SeatWithRoom[]) => {
        this.seatWithRooms = r;
        this.dataSource.data = this.seatWithRooms;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        this.notifySrv.message('Failed to load data', 'DISMISS');
        console.log(err.message || err);
      },
    });
  }

}
