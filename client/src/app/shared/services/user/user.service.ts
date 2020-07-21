import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { APIService } from '../util/api.service';
import { User } from '../../models/user/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService extends APIService {

  constructor(private http: HttpClient) {
    super(http);
  }

  createUser(user: User): Observable<User> {
    return super.apiPost<User>('users', user);
  }

  getUser(): Observable<Array<User>> {
    return super.apiGet<Array<User>>('users');
  }

  getUserByEmail(email: string): Observable<User> {
    return super.apiGet<User>('users/email/' + email);
  }

  getLogin(): Observable<any> {
    return super.apiGet<any>('users/login');
  }

  getUserId(id: string): Observable<User> {
    return super.apiGet<User>('users/' + id);
  }

  updateUserGroup(user: User): Observable<User> {
    return super.apiPut<User>('users/group/' + user._id, user);
  }

  deleteUser(id: string): Observable<User> {
    return super.apiDelete<User>('users/' + id);
  }
}
