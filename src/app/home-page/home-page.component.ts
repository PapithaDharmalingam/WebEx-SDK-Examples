import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { loginService } from '../login.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.sass'],
})
export class HomePageComponent implements OnInit, OnDestroy {
  status: string;
  subs: Subscription;


  constructor(private authService: loginService) {}

  ngOnInit(): void {
    // if (localStorage.getItem('webex_token')) {
    //   this.status = 'Log Out';
    // } else {
    //   this.status = 'Log In';
    //   this.authService.intialSetup();
    // }
    this.subs = this.authService.statusChanged.subscribe((status: string) => {
      this.status = status;
      console.log(this.status);
    });

    this.authService.intialSetup();

  }

  // onStatus() {
  //   if (this.status == 'Log Out') {
  //     this.onLogout();
  //   } else if (this.status == 'Log In') {
  //     this.onLogin();
  //   }
  // }

  onLogin() {
    // if (!localStorage.getItem('webex_token')) {
    //   this.authService.intialSetup();
    //   this.authService.onLogin();
    // }
    //this.authService.intialSetup();
    this.authService.onLogin();
  }
  onLogout() {
    // localStorage.removeItem('webex_token');
    // this.status = 'Log In';
    // //add actual log out fn
    this.authService.onLogout();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();

  }
}
