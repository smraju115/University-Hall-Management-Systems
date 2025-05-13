import { Component, ViewChild } from '@angular/core';
import { HallFloor } from '../../../models/Data/hall-floor';
import { HallFloorService } from '../../../services/hall-floor.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NotifyService } from '../../../services/notify.service';
import { DeleteDialogComponent } from '../../common/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-hall-floor-list',
  templateUrl: './hall-floor-list.component.html',
  styleUrl: './hall-floor-list.component.css'
})
export class HallFloorListComponent {
hallFloors:HallFloor[]=[];
  dataSource:MatTableDataSource<HallFloor> = new MatTableDataSource(this.hallFloors);
  columns=['serial', 'floorNo','hallBlockId', 'createdDate','createdUserId','modifiedDate','modifiedUserId', 'actions'];
  @ViewChild(MatSort, {static:false}) sort!:MatSort;
  @ViewChild(MatPaginator, {static:false}) paginator!:MatPaginator;

  constructor(
    private hallFloorSrv:HallFloorService,
    private notifySrv:NotifyService,
    private matDialog:MatDialog
  ){}


  deleteHallFloor(data:HallFloor){
    this.matDialog.open(DeleteDialogComponent, {
      "width":"350px"

    }).afterClosed()
    .subscribe({
      next: result=>{
        if(result) {
          this.hallFloorSrv.delete(<number>data.hallFloorId)
          .subscribe({
            next: r=>{
              this.dataSource.data = this.dataSource.data.filter(x=> x.hallFloorId != data.hallFloorId);
            }
          })
        }
      }
    })
  };

  ngOnInit(): void {
    this.hallFloorSrv.getAll()
    .subscribe({
      next: r=>{
        this.hallFloors=r;
        console.log(this.hallFloors)
        this.dataSource.data = this.hallFloors;
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
