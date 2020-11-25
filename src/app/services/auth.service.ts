import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../shared/user';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { switchMap } from 'rxjs/operators';
@Injectable()

export class AuthService 
{
  user$:Observable<User>;
  user:User;

  constructor (
    private afauth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private loadingCtrl : LoadingController,
    private toastr: ToastController
  ){
    this.user$ = this.afauth.authState.pipe(
      switchMap(user =>
        {
          if(user) 
          {
            return this.afs.doc(`users/${user.uid}`).valueChanges();
          } else {
            return of(null);
          }
        })
    );
  }

  async login(email, pass) {
    const loading = await this.loadingCtrl.create({
      message:'Authenticating..',
      spinner: 'crescent',
      showBackdrop:true
    });
    loading.present();
    this.afauth.signInWithEmailAndPassword(email,pass).then((data)=>{
      if(!data.user.emailVerified) {
        loading.dismiss();
        this.toast('Please verify your email','danger');
        this.logout();
      } else {
        loading.dismiss();
        this.router.navigate(['/home']);
      }
    })
  } //end of login

  logout() {
    this.afauth.signOut().then(()=>{
      this.router.navigate(['/login']);
    });
  }

  async toast(message,status) 
  {
    const toast = await this.toastr.create({
      message:message,
      position: 'top',
      color: status,
      duration: 2000
    });
    toast.present();
  }

}
