import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CustomRequest } from '../../../models/Data/request';
import { NotifyService } from '../../../services/notify.service';
import { RequestService } from '../../../services/request.service';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrl: './request-list.component.css'
})
export class RequestListComponent implements OnInit {
  requests: CustomRequest[] = [];
  dataSource:MatTableDataSource<CustomRequest> = new MatTableDataSource(this.requests);
  columns=['serial', 'requestType', 'requestDetails', 'status', 'createdDate','createdUserId', 'actions'];
  @ViewChild(MatSort, {static:false}) sort!:MatSort;
  @ViewChild(MatPaginator, {static:false}) paginator!:MatPaginator;

  constructor(
    private reqSrv:RequestService,
    private notifySrv:NotifyService,
    private matDialog:MatDialog
  ){}


  ngOnInit(): void {
    this.reqSrv.getAll().subscribe({
      next: (r: CustomRequest[]) => {
        this.requests = r;
        this.dataSource.data = this.requests;
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
