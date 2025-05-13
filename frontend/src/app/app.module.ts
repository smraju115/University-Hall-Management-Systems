import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NavBarComponent } from './components/common/nav-bar/nav-bar.component';
import { HomeComponent } from './components/common/home/home.component';
import { StudentListComponent } from './components/student/student-list/student-list.component';
import { StudentAddComponent } from './components/student/student-add/student-add.component';
import { StudentEditComponent } from './components/student/student-edit/student-edit.component';
import { AboutComponent } from './components/common/about/about.component';
import { NoticeComponent } from './components/common/notice/notice.component';
import { PaymentsComponent } from './components/payments/payments.component';
import { MatImportModule } from './modules/mat-import/mat-import.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MultilevelMenuService, NgMaterialMultilevelMenuModule } from 'ng-material-multilevel-menu';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AsyncPipe} from '@angular/common';
import {BreakpointObserver} from '@angular/cdk/layout';
import { StudentDataService } from './services/student-data.service';
import { NotifyService } from './services/notify.service';
import { DatePipe } from '@angular/common';
import { HallCreateComponent } from './components/halls/hall-create/hall-create.component';
import { HallEditComponent } from './components/halls/hall-edit/hall-edit.component';
import { HallListComponent } from './components/halls/hall-list/hall-list.component';
import { HallService } from './services/hall.service';
import { HallBlockCreateComponent } from './components/hall-blocks/hall-block-create/hall-block-create.component';
import { HallBlockEditComponent } from './components/hall-blocks/hall-block-edit/hall-block-edit.component';
import { HallBlockListComponent } from './components/hall-blocks/hall-block-list/hall-block-list.component';
import { HallBlockService } from './services/hall-block.service';
import { HallFloorCreateComponent } from './components/hall-floor/hall-floor-create/hall-floor-create.component';
import { HallFloorEditComponent } from './components/hall-floor/hall-floor-edit/hall-floor-edit.component';
import { HallFloorListComponent } from './components/hall-floor/hall-floor-list/hall-floor-list.component';
import { RoomCreateComponent } from './components/room/room-create/room-create.component';
import { RoomEditComponent } from './components/room/room-edit/room-edit.component';
import { RoomListComponent } from './components/room/room-list/room-list.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import { RequestAddComponent } from './components/request/request-add/request-add.component';
import { RequestEditComponent } from './components/request/request-edit/request-edit.component';
import { RequestListComponent } from './components/request/request-list/request-list.component';
import { RequestService } from './services/request.service';
import { StudentRequestListComponent } from './components/student-request/student-request-list/student-request-list.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { SeatwithroomCreateComponent } from './components/seatwithroom/seatwithroom-create/seatwithroom-create.component';
import { SeatwithroomEditComponent } from './components/seatwithroom/seatwithroom-edit/seatwithroom-edit.component';
import { SeatwithroomListComponent } from './components/seatwithroom/seatwithroom-list/seatwithroom-list.component';
import { StudentRoomCreateComponent } from './components/studentroom/student-room-create/student-room-create.component';
import { StudentRoomEditComponent } from './components/studentroom/student-room-edit/student-room-edit.component';
import { StudentRoomListComponent } from './components/studentroom/student-room-list/student-room-list.component';
import { SeatwithroomService } from './services/seatwithroom.service';
import { StudentroomService } from './services/studentroom.service';
import { AdminNoticeCreateComponent } from './components/admin-notice/admin-notice-create/admin-notice-create.component';
import { AdminNoticeListComponent } from './components/admin-notice/admin-notice-list/admin-notice-list.component';
import { AdminNoticeEditComponent } from './components/admin-notice/admin-notice-edit/admin-notice-edit.component';
import { AdminNoticeService } from './services/admin-notice.service';
import { DeleteDialogComponent } from './components/common/delete-dialog/delete-dialog.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { StudentRoomDetailsDailogComponent } from './components/common/student-room-details-dailog/student-room-details-dailog.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { BreakingNewsComponent } from './components/common/breaking-news/breaking-news.component';






@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    StudentListComponent,
    StudentAddComponent,
    StudentEditComponent,
    AboutComponent,
    NoticeComponent,
    PaymentsComponent,
    LoginComponent,
    HallCreateComponent,
    HallEditComponent,
    HallListComponent,
    HallBlockCreateComponent,
    HallBlockEditComponent,
    HallBlockListComponent,
    HallFloorCreateComponent,
    HallFloorEditComponent,
    HallFloorListComponent,
    RoomCreateComponent,
    RoomEditComponent,
    RoomListComponent,
    RegisterComponent,
    RequestAddComponent,
    RequestEditComponent,
    RequestListComponent,
    StudentRequestListComponent,
    AdminDashboardComponent,
    SeatwithroomCreateComponent,
    SeatwithroomEditComponent,
    SeatwithroomListComponent,
    StudentRoomCreateComponent,
    StudentRoomEditComponent,
    StudentRoomListComponent,
    AdminNoticeCreateComponent,
    AdminNoticeListComponent,
    AdminNoticeEditComponent,
    DeleteDialogComponent,
    FooterComponent,
    StudentRoomDetailsDailogComponent,
    UserDashboardComponent,
    BreakingNewsComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatImportModule,
    NgMaterialMultilevelMenuModule,
    FormsModule,
    ReactiveFormsModule,
    AsyncPipe,


  ],
  providers: [
    provideAnimationsAsync(), MultilevelMenuService,
    HttpClient, StudentDataService, NotifyService, DatePipe, HallService, HallBlockService,
    RequestService, SeatwithroomService, StudentroomService, AdminNoticeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
