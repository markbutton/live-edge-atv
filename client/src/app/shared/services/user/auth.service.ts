import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { KeycloakOptions } from 'keycloak-angular';

import { User } from '../../models/user/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentuser: User;
  keycloakConfig: KeycloakOptions = {
    config: {
      url: 'https://keycloak.spectrumtoolbox.com/auth',
      realm: 'spectrumtoolbox',
      clientId: 'live-edge-atv'
    }
  };

  constructor(private http: HttpClient) { }
}
