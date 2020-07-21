import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthMockService {

  public token: 'test';

  constructor() { }

  public isLoggedIn(): boolean {
    return true;
  }

}
