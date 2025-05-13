import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../services/authentication/auth.service';
import { NotifyService } from '../../../services/notify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  data: any = {};
  @ViewChild('registerForm') registerForm!: NgForm; // Use non-null assertion operator

  constructor(
    private authService: AuthService,
    private notifyService: NotifyService,
    private router: Router
  ) {}
  ngOnInit(): void {

  }
 
  register(): void {
    this.authService.register(this.data)
      .subscribe(
        (response) => {
          console.log('Registration successful', response);
          this.notifyService.message('User created successfully.', 'Close');
          this.registerForm.resetForm(); 
        },
        (error) => {
          console.error('Registration failed', error);
          this.notifyService.message(error.error, 'Close');
        }
      );
  }
}
