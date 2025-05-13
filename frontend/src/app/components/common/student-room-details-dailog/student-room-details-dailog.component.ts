import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-student-room-details-dailog',
  templateUrl: './student-room-details-dailog.component.html',
  styleUrl: './student-room-details-dailog.component.css'
})

export class StudentRoomDetailsDailogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
