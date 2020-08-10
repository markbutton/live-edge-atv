import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';

import { User } from '../../models/user/user.model';
import { UserService } from '../../services/user/user.service';

@Injectable()
export class UserState {
  private userLoaded = false;
  // State Model
  // tslint:disable-next-line: variable-name
  private _user: BehaviorSubject<User> = new BehaviorSubject(Object());
  public user: Observable<User> = this._user.asObservable();

  protected get isLocal(): boolean { return (document.location.hostname.indexOf('localhost') >= 0); }
  // isLocal = false;

  constructor(
    @Inject('SESSIONSTORAGE') private sessionStorage,
    @Inject('LOCALSTORAGE') private localStorage,
    private keycloak: KeycloakService,
    private userService: UserService) {
    if (this.isLocal) {
      // TODO: Create Test User
      console.log('Set testing mode user here');
    } else {
      if (!this.userLoaded) {
        this.getInitialUser();
      }
    }
  }

  // State Controller
  async getInitialUser(): Promise<any> {
    const cu = this.localStorage.getItem('user');
    if (cu && this.keycloak.isLoggedIn()) {
      this._user.next(JSON.parse(cu));
    } else {
      await this.initKeycloak(this.keycloak);
      this.setUser();
    }
    this.userLoaded = true;
  }

  getCurrentUser(): User {
    const user = this._user.getValue();
    return user;
  }

  initKeycloak(keycloak: KeycloakService): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const keycloakConfig = {
        url: 'https://keycloak.spectrumtoolbox.com/auth',
        realm: 'spectrumtoolbox',
        clientId: 'live-edge'
      };
      try {
        await keycloak.init({
          config: keycloakConfig,
          initOptions: {
            onLoad: 'login-required',
            checkLoginIframe: false
          },
          bearerExcludedUrls: []
        });
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  getKeycloakUser(): Promise<any> {
    return new Promise(async (resolve) => {
      if (this.keycloak.isLoggedIn()) {
        const ud: KeycloakProfile = await this.keycloak.loadUserProfile();
        return resolve(ud);
      } else {
        return resolve(null);
      }
    });
  }

  createUser(user: User): void {
    this.userService.createUser(user).subscribe(
      (u: User) => {
        this._user.next(u);
        this.sessionStorage.setItem('user', JSON.stringify(u));
      },
      error => {
        console.log('[ERROR] Something wrong getting the current user: ', error);
      }
    );
  }

  async setUser(): Promise<any> {
    const ud: any = await this.getKeycloakUser();
    let cu = new User();

    this.userService.getUserByEmail(ud.email).subscribe(
      (user: User) => {
        if (user) {
          cu = user;
          this._user.next(user);
          this.localStorage.setItem('user', JSON.stringify(cu));
        } else {
          cu.email = ud.email;
          cu.name = `${ud.firstName} ${ud.lastName}`;
          cu.group = 'default';
          this.createUser(cu);
        }
      },
      error => {
        console.log('[ERROR] Something wrong getting the current user: ', error);
      });
  }
}
