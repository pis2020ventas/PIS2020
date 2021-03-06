import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string;
  password: string;

  constructor(
    private router: Router,
    private auth: AuthService,
    private toastr: ToastController,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
  }

  register() 
  {
    this.router.navigate(['/register']);
  }//end of register

  forgot() 
  {
    this.router.navigate(['/forgot-password']);
  }//end of forgot

  async login() 
  {
    if(this.email && this.password) {
      const loading = await this.loadingCtrl.create({
        message:'Logging in..',
        spinner:'crescent',
        showBackdrop:true
      });
      loading.present();
      this.auth.login(this.email,this.password)
      .then(()=>{
      })
      .catch((error)=>{
        this.toast(error.message, 'danger');
      });
      loading.dismiss();
    } else {
    }
  } //end of login

  async onLoginGoogle()
  {
    try {
      const user = await this.auth.logingoogle();
      if(user) {
        const isVerified = this.auth.isEmailVerified(user);
        if (isVerified) {
          this.onLoginRedirect(isVerified);
        } else {
          this.toast('Please Verify your email', 'danger');
        }
      }
    } catch (error) {
      console.log('Error->',error);
    }
  }

  onLoginRedirect(isVerified: boolean): void
  {
    this.router.navigate(['/']);
  }

  async toast(message,status) 
  {
    const toast = await this.toastr.create({
      message: message,
      position: 'top',
      color:status,
      duration:2000
    });
    toast.present();
  }// end of toast
}
