import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/common/home/home.component';
import { StudentListComponent } from './components/student/student-list/student-list.component';
import { AboutComponent } from './components/common/about/about.component';
import { NoticeComponent } from './components/common/notice/notice.component';
import { StudentAddComponent } from './components/student/student-add/student-add.component';
import { HallListComponent } from './components/halls/hall-list/hall-list.component';
import { HallCreateComponent } from './components/halls/hall-create/hall-create.component';
import { HallEditComponent } from './components/halls/hall-edit/hall-edit.component';
import { HallBlockCreateComponent } from './components/hall-blocks/hall-block-create/hall-block-create.component';
import { HallBlockEditComponent } from './components/hall-blocks/hall-block-edit/hall-block-edit.component';
import { HallBlockListComponent } from './components/hall-blocks/hall-block-list/hall-block-list.component';
import { HallFloorCreateComponent } from './components/hall-floor/hall-floor-create/hall-floor-create.component';
import { HallFloorEditComponent } from './components/hall-floor/hall-floor-edit/hall-floor-edit.component';
import { HallFloorListComponent } from './components/hall-floor/hall-floor-list/hall-floor-list.component';
import { RoomCreateComponent } from './components/room/room-create/room-create.component';
import { RoomEditComponent } from './components/room/room-edit/room-edit.component';
import { RoomListComponent } from './components/room/room-list/room-list.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { NavBarComponent } from './components/common/nav-bar/nav-bar.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import { authGuardFnGuard } from './guards/auth-fn.guard';
import { RequestAddComponent } from './components/request/request-add/request-add.component';
import { RequestEditComponent } from './components/request/request-edit/request-edit.component';
import { RequestListComponent } from './components/request/request-list/request-list.component';
import { StudentEditComponent } from './components/student/student-edit/student-edit.component';
import { StudentRequestListComponent } from './components/student-request/student-request-list/student-request-list.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { SeatwithroomCreateComponent } from './components/seatwithroom/seatwithroom-create/seatwithroom-create.component';
import { SeatwithroomEditComponent } from './components/seatwithroom/seatwithroom-edit/seatwithroom-edit.component';
import { SeatwithroomListComponent } from './components/seatwithroom/seatwithroom-list/seatwithroom-list.component';
import { StudentroomService } from './services/studentroom.service';
import { StudentRoomCreateComponent } from './components/studentroom/student-room-create/student-room-create.component';
import { StudentRoomEditComponent } from './components/studentroom/student-room-edit/student-room-edit.component';
import { StudentRoomListComponent } from './components/studentroom/student-room-list/student-room-list.component';
import { AdminNoticeCreateComponent } from './components/admin-notice/admin-notice-create/admin-notice-create.component';
import { AdminNoticeEditComponent } from './components/admin-notice/admin-notice-edit/admin-notice-edit.component';
import { AdminNoticeListComponent } from './components/admin-notice/admin-notice-list/admin-notice-list.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';

const routes: Routes = [

  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},

  {path:'', component:NavBarComponent, children: [

    {path:'', component:HomeComponent},
    {path:'home', component:HomeComponent},
    {path:'admin-dashboard', component:AdminDashboardComponent, canActivate: [authGuardFnGuard(['Admin'])]},
    {path:'user-dashboard', component:UserDashboardComponent},


    {path:'student-add', component:StudentAddComponent , canActivate: [authGuardFnGuard(['Admin'])]},
    {path:'student-list', component:StudentListComponent , canActivate: [authGuardFnGuard(['Admin'])]}, //For Authorize
    //{path:'student-list', component:StudentListComponent },


    {path:'request-create', component:RequestAddComponent, canActivate: [authGuardFnGuard(['Admin', 'User'])]},
    {path:'request-edit', component:RequestEditComponent, canActivate: [authGuardFnGuard(['Admin'])]},
    {path:'request-list', component:RequestListComponent, canActivate: [authGuardFnGuard(['Admin', 'User'])]},

    {path:'student-request-list', component:StudentRequestListComponent},


    {path:'hall-create', component:HallCreateComponent, canActivate: [authGuardFnGuard(['Admin'])]},
    {path:'hall-edit', component:HallEditComponent, canActivate: [authGuardFnGuard(['Admin'])]},
    {path:'hall-list', component:HallListComponent, canActivate: [authGuardFnGuard(['Admin'])]},

    {path:'hall-block-create', component:HallBlockCreateComponent, canActivate: [authGuardFnGuard(['Admin'])]},
    {path:'hall-block-edit', component:HallBlockEditComponent, canActivate: [authGuardFnGuard(['Admin'])]},
    {path:'hall-block-list', component:HallBlockListComponent, canActivate: [authGuardFnGuard(['Admin'])]},

    {path:'hall-floor-create', component:HallFloorCreateComponent, canActivate: [authGuardFnGuard(['Admin'])]},
    {path:'hall-floor-edit', component:HallFloorEditComponent, canActivate: [authGuardFnGuard(['Admin'])]},
    {path:'hall-floor-list', component:HallFloorListComponent, canActivate: [authGuardFnGuard(['Admin'])]},

    {path:'room-create', component:RoomCreateComponent, canActivate: [authGuardFnGuard(['Admin'])]},
    {path:'room-edit', component:RoomEditComponent, canActivate: [authGuardFnGuard(['Admin'])]},
    {path:'room-list', component:RoomListComponent, canActivate: [authGuardFnGuard(['Admin'])]},

    {path:'seatwithroom-create', component:SeatwithroomCreateComponent, canActivate: [authGuardFnGuard(['Admin'])]},
    {path:'seatwithroom-edit', component:SeatwithroomEditComponent, canActivate: [authGuardFnGuard(['Admin'])]},
    {path:'seatwithroom-list', component:SeatwithroomListComponent, canActivate: [authGuardFnGuard(['Admin'])]},

    {path:'studentroom-create', component:StudentRoomCreateComponent, canActivate: [authGuardFnGuard(['Admin'])]},
    {path:'studentroom-edit', component:StudentRoomEditComponent, canActivate: [authGuardFnGuard(['Admin'])]},
    {path:'studentroom-list', component:StudentRoomListComponent, canActivate: [authGuardFnGuard(['Admin'])]},

    {path: 'admin-notice-create', component:AdminNoticeCreateComponent, canActivate: [authGuardFnGuard(['Admin'])]},
    {path: 'admin-notice-edit', component:AdminNoticeEditComponent, canActivate: [authGuardFnGuard(['Admin'])]},
    {path: 'admin-notice-list', component:AdminNoticeListComponent, canActivate: [authGuardFnGuard(['Admin'])]},

    {path:'about', component:AboutComponent},
    {path:'notice', component:NoticeComponent}


  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
