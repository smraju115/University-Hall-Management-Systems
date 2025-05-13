import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminNotice } from '../../../models/Data/admin-notice';
import { AdminNoticeService } from '../../../services/admin-notice.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { throwError } from 'rxjs';
import { NotifyService } from '../../../services/notify.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../../common/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-admin-notice-list',
  templateUrl: './admin-notice-list.component.html',
  styleUrl: './admin-notice-list.component.css'
})
export class AdminNoticeListComponent implements OnInit {
    noticePath ='http://localhost:5115/NoticeFiles';
    adminNotice:AdminNotice[]=[];
    dataSource:MatTableDataSource<AdminNotice> = new MatTableDataSource(this.adminNotice);
    columns =['serial','title', 'noticeFile', 'createdDate','createdUserId', 'actions']
      @ViewChild(MatSort, {static:false}) sort!:MatSort;
      @ViewChild(MatPaginator, {static:false}) paginator!:MatPaginator;
      constructor(
        private adminNoticeSrv:AdminNoticeService,
        private notifyService:NotifyService,
        private matDialog:MatDialog
      ){}


  /* ngOnInit(): void {
    this.adminNoticeSrv.getAll()
    .subscribe({
      next: r=>{
        this.adminNotice=r;
        this.dataSource.data = this.adminNotice;
        this.dataSource.sort= this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: err=>{
        this.notifyService.message("Failed to load Student Data", "Dismiss")
        throwError(()=> err);
      }
    })
  } */

    deleteAdminNotice(data:AdminNotice){
      this.matDialog.open(DeleteDialogComponent, {
        "width":"350px"

      }).afterClosed()
      .subscribe({
        next: result=>{
          if(result) {
            this.adminNoticeSrv.delete(<number>data.noticeId)
            .subscribe({
              next: r=>{
                this.dataSource.data = this.dataSource.data.filter(x=> x.noticeId != data.noticeId);
              }
            })
          }
        }
      })
    };

    ngOnInit(): void {
      this.adminNoticeSrv.getAll()
        .subscribe({
          next: r => {
            this.adminNotice = r.map(notice => ({
              ...notice,
              noticeFile: `${this.noticePath}/${notice.noticeFile}` // Combine base path with file name
            }));

            this.dataSource.data = this.adminNotice;
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
          },
          error: err => {
            this.notifyService.message("Failed to load Notices", "Dismiss");
            throwError(() => err);
          }
        });
      }

}
