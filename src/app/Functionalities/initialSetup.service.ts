import { Injectable } from '@angular/core';
import Webex from 'webex';
@Injectable({
  providedIn: 'root',
})
export class InitialSetupService {
  webex: any;
 accessToken
  createInstance() {
    this.webex = Webex.init({
      config: {
        meetings: {
          reconnection: {
            enabled: true
          }
        }
      },
      credentials: {
        access_token: localStorage.getItem('webex_token')
      },
    });
  }
}
