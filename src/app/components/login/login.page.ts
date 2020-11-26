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
        console.log('login sucessfull');
        //enviame a esta otra pagina
        loading.dismiss();
      })
      .catch((error)=>{
        loading.dismiss();
        this.toast(error.message, 'danger');
      });
    } else {
      this.toast('Please enter your email and password','danger');
    }
  } //end of login

  async onLoginGoogle()
  {
    try {
      const user = await this.auth.logingoogle2();
      if(user) {
        const isVerified = this.auth.isEmailVerified(user);
        if (isVerified) {
          this.onLoginRedirect();
        } else {
          this.toast('Please Verify your email', 'danger');
        }
      }
    } catch (error) {
      console.log('Error->',error);
    }
  }

  async onLoginFacebook()
  {
    try {
      const user = await this.auth.loginfacebook();
      if(user) {
        const isVerified = this.auth.isEmailVerified(user);
        if (isVerified) {
          this.onLoginRedirect();
        } else {
          this.toast('Please Verify your email', 'danger');
        }
      }
    } catch (error) {
      console.log('Error->',error);
    }
  }

  onLoginRedirect(): void
  {
    this.router.navigate(['/products']);
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
