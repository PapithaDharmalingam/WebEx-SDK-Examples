import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import Webex from 'webex';
@Injectable({
  providedIn: 'root'
})

export  class loginService{
webex: any;
status:string
statusChanged = new Subject<String>();


intialSetup(){

  if (localStorage.getItem('webex_token')) {
    this.status = 'Log Out';
  } else {
    this.status = 'Log In';
    this.webex = Webex.init({
      config: {
        credentials: {
          client_id: 'Cc8d6690407f0e2a5a4e67da84f2de37517d9c3f7154b7f22d19d76594a45bd6e',
          redirect_uri: 'https://preptask-58a9c.web.app/createSpace',
          scope: 'spark:all spark:kms',
          refreshCallback(webex, token) {
            webex.authorization.initiateLogin();
          }
        }
      }
    });
    this.listenForWebex();
  }
  this.statusChanged.next(this.status);

  //return this.status;
}
onLogin(){

  if (!this.webex){
    this.intialSetup();
  }
  this.webex.authorization.initiateImplicitGrant();
}
onLogout() {
  localStorage.removeItem('webex_token');
  this.status = 'Log In';
  this.statusChanged.next(this.status);
  //this.webex.authorization.logout(false)

  //add actual log out fn
}

async listenForWebex() {
  this.webex.once(`ready`, () => {
    console.log('READY', this.webex.credentials.supertoken);
    if (this.webex.credentials.supertoken){
      localStorage.setItem('webex_token', this.webex.credentials.supertoken.access_token);
      this.status = 'Log Out'
      this.statusChanged.next(this.status);
    }
  });
}
}
