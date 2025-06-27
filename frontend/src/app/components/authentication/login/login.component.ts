import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { LoginModel } from '../../../models/authentication/login-model';
import { LoginService } from '../../../services/authentication/login.service';
import { AuthService } from '../../../services/authentication/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  data: LoginModel = {};
  returnUrl: string = "/navbar";
  hidePassword: boolean = true; //

  private route = inject(Router);

  constructor(
    private loginService: LoginService,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.loginService.getEmitter().subscribe(x => {
      if (x === "login") {
        this.redirectBasedOnRole();
      }
      if (x === "logout") {
      }
    });
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  login(f: NgForm) {
    console.log(this.data);
    this.loginService.login(this.data);
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(
      q => {
        this.returnUrl = q['returnUrl'] ?? '/dashboard';
      }
    );
  };

  private redirectBasedOnRole() {
    if (this.authService.roleMatch(['Admin'])) {
      this.router.navigateByUrl('/admin-dashboard');
    }
    else if(this.authService.roleMatch(['User'])){
      this.router.navigateByUrl('/user-dashboard');
    }

    else {
      this.router.navigateByUrl('/home');
    }
  }

  handleLogin(response:any){
    if(response){
      //decode tocken
      const payload =this.decodeTocken(response.credential);
      //store in session
        sessionStorage.setItem("loggedInUser", JSON.stringify(payload));
      //nevigate to home/browse
      this.router.navigate(['/home'])
    }
  }
  private decodeTocken(token:string){
    return JSON.parse(atob(token.split(".")[1]));
  }
}
