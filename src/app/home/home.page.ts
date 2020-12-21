import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor
  (
    private afauth: AngularFireAuth,
    private router: Router
  ) { }

  ngOnInit() {
  }
  logout(){
    this.afauth.signOut().then(() => {
      this.router.navigate(['/']);
    });
  }
  
  continue(){
    this.router.navigate(['/']);
  }
}
