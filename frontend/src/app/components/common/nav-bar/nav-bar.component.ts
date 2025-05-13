import { Component, inject, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { navItems } from '../../../models/constants';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '../../../services/authentication/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',

})

export class NavBarComponent implements OnInit{
  private breakpointObserver = inject(BreakpointObserver);

  isAdminLoggedIn : any;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  config = {
    paddingAtStart: true,
    interfaceWithRoute: true,
    useDividers: true,

  };
  navigationItems = navItems;


  constructor(
    public authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.redirectBasedOnRole();
  }



  get username() {
    return this.authService.userName;
  }
  get isLoggedIn() {
    return this.authService.isLoggedIn();
  }
  logout() {
    this.router.navigateByUrl('/login');
    this.authService.logout();
  }

  public redirectBasedOnRole() {
    if (this.authService.roleMatch(['Admin'])) {
      this.isAdminLoggedIn = 1;
    }
    else if(this.authService.roleMatch(['User'])){
      this.isAdminLoggedIn = 2;
    }

    else {
      this.router.navigateByUrl('/home');
    }
  }
}
