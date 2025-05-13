import { AdminDashboardService } from './../../services/admin-dashboard.service';
import { Component, OnInit } from '@angular/core';
import { navItems } from '../../models/constants';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {
  isLoading: boolean = true;

  logout() {
    // Implement logout logic
    console.log('Logout clicked');
  }

  totalStudents: number = 0;
  totalHalls: number = 0;
  totalHallBlocks: number = 0;
  totalHallFloors: number = 0;
  totalRooms: number = 0;
  totalRequests: number = 0;
  totalFeedbacks: number = 0;
  totalNotices: number = 0;


  constructor(private adminDashSrv: AdminDashboardService) {}

  ngOnInit(): void {
    this.loadTotalStudents();
    this.loadTotalHalls();
    this.loadTotalHallBlocks();
    this.loadTotalHallFloors();
    this.loadTotalRooms();
    this.loadTotalRequests();
    this.loadTotalFeedbacks();
    this.loadTotalNotice();
    this.loadData();
  }

  // Total Students load Method
  loadTotalStudents() {
    this.adminDashSrv.getTotalStudents().subscribe(
      (data) => {
        this.totalStudents = data.totalStudents;
      },
      (error) => {
        console.error('Error fetching total students:', error);
      }
    );
  }
   // Total Halls load Method
   loadTotalHalls() {
    this.adminDashSrv.getTotalHalls().subscribe(
      (data) => {
        this.totalHalls = data.totalHalls;
      },
      (error) => {
        console.error('Error fetching total students:', error);
      }
    );
  }

  // Total HallBlocks load Method
  loadTotalHallBlocks() {
    this.adminDashSrv.getTotalHallBlocks().subscribe(
      (data) => {
        this.totalHallBlocks = data.totalHallBlocks;
      },
      (error) => {
        console.error('Error fetching total students:', error);
      }
    );
  }

   // Total HallFloors load Method
   loadTotalHallFloors() {
    this.adminDashSrv.getTotalHallFloors().subscribe(
      (data) => {
        this.totalHallFloors = data.totalHallFloors;
      },
      (error) => {
        console.error('Error fetching total students:', error);
      }
    );
  }

  // Total Rooms load Method
  loadTotalRooms() {
    this.adminDashSrv.getTotalRooms().subscribe(
      (data) => {
        this.totalRooms = data.totalRooms;
      },
      (error) => {
        console.error('Error fetching total students:', error);
      }
    );
  }

// Total Requests load Method
loadTotalRequests() {
  this.adminDashSrv.getTotalRequests().subscribe(
    (data) => {
      this.totalRequests = data.totalRequests;
    },
    (error) => {
      console.error('Error fetching total students:', error);
    }
  );
}

// Total Feedbacks load Method
loadTotalFeedbacks() {
  this.adminDashSrv.getTotalFeedbacks().subscribe(
    (data) => {
      this.totalFeedbacks = data.totalFeedbacks;
    },
    (error) => {
      console.error('Error fetching total students:', error);
    }
  );
}

// Total Feedbacks load Method
loadTotalNotice() {
  this.adminDashSrv.getTotalNotices().subscribe(
    (data) => {
      this.totalNotices = data.totalNotices;
    },
    (error) => {
      console.error('Error fetching total students:', error);
    }
  );
}


loadData(): void {
  setTimeout(() => {
    this.isLoading = false;
  }, 1000);
}


}
