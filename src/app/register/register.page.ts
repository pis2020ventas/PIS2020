import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private authSvc: AuthService, private router: Router) { }

  ngOnInit() {
  }
  async onRegister(email,password) {
    try {
      const user = await this.authSvc.register(email.value, password.value);
      if(user) {
        const isVerified = this.authSvc.isEmailVerified(user);
        this.redirectUser(isVerified);
        console.log('user->',user);
      }

    } catch (error) {
      console.log('Error ->', error);
    }
  }

  redirectUser(isVerified:boolean) {
    if(isVerified) {
      this.router.navigate(['administrator']);
    } else {
      this.router.navigate(['verify-email']);
    }
  }
}
