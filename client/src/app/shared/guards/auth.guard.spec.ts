import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { KeycloakService } from 'keycloak-angular';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { getSessionStorage, getLocalStorage } from '../../app.module';
import { AuthGuard } from './auth.guard';
import { UserState } from '../state';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let isLocal = true;
  const router = {
    navigate: jasmine.createSpy('navigate')
  };

  // async beforeEach
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule
      ],
      providers: [
        AuthGuard,
        KeycloakService,
        UserState,
        { provide: 'SESSIONSTORAGE', useFactory: getSessionStorage },
        { provide: 'LOCALSTORAGE', useFactory: getLocalStorage },
        { provide: Router, useValue: router }
      ]
    })
      .compileComponents(); // compile template and css
  }));

  // synchronous beforeEach
  beforeEach(() => {
    authGuard = TestBed.inject(AuthGuard);
  });

  it('be able to hit route when user is logged in', () => {
    isLocal = true;
    expect(authGuard).toBeTruthy();
    // expect(authGuard.canActivate()).toBe(true);
  });

  it('not be able to hit route when user is not logged in', () => {
    isLocal = false;
    expect(authGuard).toBeTruthy();
    // expect(AuthGuard.canActivate()).toBe(false);
  });
});
