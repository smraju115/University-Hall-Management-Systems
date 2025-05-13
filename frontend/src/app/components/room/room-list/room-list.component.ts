import { Component, ViewChild } from '@angular/core';
import { Room } from '../../../models/Data/room';
import { RoomService } from '../../../services/room.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NotifyService } from '../../../services/notify.service';
import { DeleteDialogComponent } from '../../common/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrl: './room-list.component.css'
})
export class RoomListComponent {
rooms:Room[] =[];
dataSource:MatTableDataSource<Room> = new MatTableDataSource(this.rooms);
columns=['serial', 'roomNo','roomType', 'hallFloorId', 'createdDate','createdUserId', 'actions'];
@ViewChild(MatSort, {static:false}) sort!:MatSort;
@ViewChild(MatPaginator, {static:false}) paginator!:MatPaginator;

constructor(
  private roomSrv:RoomService,
  private notifySrv:NotifyService,
  private matDialog:MatDialog
){}



deleteRoom(data:Room){
  this.matDialog.open(DeleteDialogComponent, {
    "width":"350px"

  }).afterClosed()
  .subscribe({
    next: result=>{
      if(result) {
        this.roomSrv.delete(<number>data.roomId)
        .subscribe({
          next: r=>{
            this.dataSource.data = this.dataSource.data.filter(x=> x.roomId != data.roomId);
          }
        })
      }
    }
  })
};

ngOnInit(): void {
  this.roomSrv.getAll()
  .subscribe({
    next: r=>{
      this.rooms=r;
      console.log(this.rooms)
      this.dataSource.data = this.rooms;
      this.dataSource.sort=this.sort;
      this.dataSource.paginator = this.paginator;
    },
    error:err=>{
      this.notifySrv.message("Faled to load device", "DISMISS");
      console.log(err.message | err);
    }
  })
}
}
