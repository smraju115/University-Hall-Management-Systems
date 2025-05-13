import { DeleteDialogComponent } from './../../common/delete-dialog/delete-dialog.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Hall } from '../../../models/Data/hall';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HallService } from '../../../services/hall.service';
import { NotifyService } from '../../../services/notify.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-hall-list',
  templateUrl: './hall-list.component.html',
  styleUrl: './hall-list.component.css'
})
export class HallListComponent implements OnInit {

halls:Hall[] =[];
dataSource:MatTableDataSource<Hall> = new MatTableDataSource(this.halls);
columns=['serial', 'hallName','hallType', 'hallCapacity', 'totalRooms', 'yearInaugurated', 'createdDate','createdUserId', 'actions'];
@ViewChild(MatSort, {static:false}) sort!:MatSort;
@ViewChild(MatPaginator, {static:false}) paginator!:MatPaginator;

constructor(
  private hallSrv:HallService,
  private notifySrv:NotifyService,
  private matDialog:MatDialog
){}


deleteDevice(data:Hall){
  this.matDialog.open(DeleteDialogComponent, {
    "width":"350px"

  }).afterClosed()
  .subscribe({
    next: result=>{
      if(result) {
        this.hallSrv.delete(<number>data.hallId)
        .subscribe({
          next: r=>{
            this.dataSource.data = this.dataSource.data.filter(x=> x.hallId != data.hallId);
          }
        })
      }
    }
  })
}

ngOnInit(): void {
  this.hallSrv.getAll()
  .subscribe({
    next: r=>{
      this.halls=r;
      console.log(this.halls)
      this.dataSource.data = this.halls;
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
