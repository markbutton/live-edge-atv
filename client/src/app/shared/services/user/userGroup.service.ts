import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { UserGroup } from '../../models/user/userGroup.model';
import { APIService } from '../util/api.service';

@Injectable({
  providedIn: 'root'
})
export class UserGroupService extends APIService {

  constructor(private http: HttpClient) {
    super(http);
  }

  createUserGroup(userGroup: UserGroup): Observable<UserGroup> {
    return super.apiPost<UserGroup>('user-groups', userGroup);
  }

  getUserGroup(): Observable<Array<UserGroup>> {
    return super.apiGet<Array<UserGroup>>('user-groups');
  }

  getUserGroupId(id: string): Observable<UserGroup> {
    return super.apiGet<UserGroup>('user-groups/' + id);
  }

  updateUserGroup(userGroup: UserGroup): Observable<UserGroup> {
    return super.apiPut<UserGroup>('user-groups/' + userGroup._id, userGroup);
  }

  deleteUserGroup(id: string): Observable<UserGroup> {
    return super.apiDelete<UserGroup>('user-groups/' + id);
  }
}
