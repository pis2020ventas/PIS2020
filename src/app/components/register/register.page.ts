import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  name:string;
  email:string;
  password:string;
  confirmPassword: string;
  passwordMatch: boolean;

  constructor
  (
    private afs: AngularFirestore,
    private afauth: AngularFireAuth,
    private loadingCtrl: LoadingController,
    private toastr: ToastController,
    private router: Router
  ) { }

  ngOnInit() {
  }

  async register()
  {
    //if (this.name && this.email && this.password &&this.passwordMatch) 
    if (this.name && this.email && this.password) 
    {
        const loading = await this.loadingCtrl.create({
        message:'loading..',
        spinner:'crescent',
        showBackdrop: true
      });
      loading.present();
      this.afauth.createUserWithEmailAndPassword(this.email,this.password).then((data)=> {
        this.afs.collection('users').doc(data.user.uid).set({
        'userId':data.user.uid,
        'email':this.email,
        'displayName':this.name,
        'emailVerified': false
        });
        
        data.user.sendEmailVerification().then(function() {
          this.toast('Sent verification');
        }).catch(function(error) {
          //console.log('Sent verification but error');
        });
      })
      .then(()=>{
        loading.dismiss();
        this.toast('Registration Succesful \t Verification Mail Sent','success');
        this.router.navigate(['/']);
      })
      .catch((error)=> {
        loading.dismiss();
        this.toast('Registration Failed','danger');
      })
    } else {
      console.log('please fill the form');
    }
  }//end of register

  checkPassword() 
  {
    if(this.password == this.confirmPassword) {
      this.passwordMatch=true;
    } else {
      this.passwordMatch=false;
    }
  }

  async toast(message,status) {
    const toast = await this.toastr.create({
      message:message,
      position:'top',
      color:status,
      duration:2000
    })
    toast.present();
  }//end of toast

}
