import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { User } from '../shared/user.Interface';
//import { AngularFireAuth, AngularFireAuthModule } from "@angular/fire/auth";

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.page.html',
  styleUrls: ['./verify-email.page.scss'],
})
export class VerifyEmailPage implements OnInit {
  //constructor(private authSvc: AuthService, private afAuth:AngularFireAuth) { }
  constructor(private authSvc: AuthService) { }
  user$: Observable<User> = this.authSvc.afAuth.user; 

  ngOnInit() {
  }

  async onSendEmail():Promise<void> {
    try {
      this.authSvc.sendVerificationEmail();   
    } catch (error) {
      console.log('Error ->',error);
    }
  }

  ngOnDestroy(): void {
    this.authSvc.logout();
  }
}
