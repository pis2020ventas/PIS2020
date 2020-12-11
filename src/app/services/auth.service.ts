import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../shared/user';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { switchMap } from 'rxjs/operators';
import firebase  from 'firebase/app';
import 'firebase/auth';
@Injectable({
  providedIn: 'root'
})

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

  private updateUserData(user:User) { 
    const userRef:AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    const data:User = {
      uid:user.uid,
      email:user.email,
      displayName: user.displayName,
      emailVerified:user.emailVerified
    };
    return userRef.set(data, {merge:true});
  }

  async sendVerificationEmail(): Promise<void> {
    try {
      return (await this.afauth.currentUser).sendEmailVerification();
    } catch (error) {
      console.log('Error -> ', error);
    }
  }
  isEmailVerified(user:User):boolean {
    return user.emailVerified ===true ? true : false;
  }
    
   async logingoogle(): Promise<User> {
    try {    
        const loading = await this.loadingCtrl.create({
        message:'Authenticating..',
        spinner: 'crescent',
        showBackdrop:true
      });
      loading.present();
      const {user} =await this.afauth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
      loading.dismiss();
      this.updateUserData(user);
      return user;
    } catch (error) {
      console.log('Error->',error);
    }
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
        this.toast('Please verify your email','danger');
        this.logout();
      } else {
        this.router.navigate(['/tabs/tab1']);
      }
    });
    loading.dismiss();
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
