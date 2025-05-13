import { Component, ViewChild } from '@angular/core';
import { HallBlock } from '../../../models/Data/hall-block';
import { HallBlockService } from '../../../services/hall-block.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NotifyService } from '../../../services/notify.service';
import { DeleteDialogComponent } from '../../common/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-hall-block-list',
  templateUrl: './hall-block-list.component.html',
  styleUrl: './hall-block-list.component.css'
})
export class HallBlockListComponent {
  hallblocks:HallBlock[]=[];
  dataSource:MatTableDataSource<HallBlock> = new MatTableDataSource(this.hallblocks);
  columns=['serial', 'blockName','hallId', 'createdDate','createdUserId','modifiedDate','modifiedUserId', 'actions'];
  @ViewChild(MatSort, {static:false}) sort!:MatSort;
  @ViewChild(MatPaginator, {static:false}) paginator!:MatPaginator;

  constructor(
    private hallBlockSrv:HallBlockService,
    private notifySrv:NotifyService,
    private matDialog:MatDialog
  ){}

  deleteHallBlock(data:HallBlock){
    this.matDialog.open(DeleteDialogComponent, {
      "width":"350px"

    }).afterClosed()
    .subscribe({
      next: result=>{
        if(result) {
          this.hallBlockSrv.delete(<number>data.hallBlockId)
          .subscribe({
            next: r=>{
              this.dataSource.data = this.dataSource.data.filter(x=> x.hallBlockId != data.hallBlockId);
            }
          })
        }
      }
    })
  };


  ngOnInit(): void {
    this.hallBlockSrv.getAll()
    .subscribe({
      next: r=>{
        this.hallblocks=r;
        console.log(this.hallblocks)
        this.dataSource.data = this.hallblocks;
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
