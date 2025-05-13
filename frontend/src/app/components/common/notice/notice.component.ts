import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { throwError } from 'rxjs';
import { AdminNotice } from '../../../models/Data/admin-notice';
import { AdminNoticeService } from '../../../services/admin-notice.service';
import { NotifyService } from '../../../services/notify.service';

@Component({
  selector: 'app-notice',
  templateUrl: './notice.component.html',
  styleUrl: './notice.component.css'
})
export class NoticeComponent {
 noticePath ='http://localhost:5115/NoticeFiles';
    adminNotice:AdminNotice[]=[];
    dataSource:MatTableDataSource<AdminNotice> = new MatTableDataSource(this.adminNotice);
    columns =['serial','title', 'createdDate', 'noticeFile']
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
