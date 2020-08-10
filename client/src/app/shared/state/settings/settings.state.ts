import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../models/user/user.model';
import { UserGroup } from '../../models/user/userGroup.model';
import { UserService } from '../../services/user/user.service';
import { UserGroupService } from '../../services/user/userGroup.service';

@Injectable()
export class SettingsState {
  // State Model
  private _users: BehaviorSubject<Array<User>> = new BehaviorSubject(Array());
  public users: Observable<Array<User>> = this._users.asObservable();
  private _userGroups: BehaviorSubject<Array<UserGroup>> = new BehaviorSubject(Array());
  public userGroups: Observable<Array<UserGroup>> = this._userGroups.asObservable();

  constructor(
    private userService: UserService,
    private userGroupService: UserGroupService) {
    this.getUsersService();
    this.getUserGroupsService();
  }

  // User management
  getUsersState(): any {
    const vers = this._users.getValue();
    return vers;
  }

  setUsersState(users) {
    this._users.next(users);
  }

  getUsersService(): void {
    this.userService.getUser().subscribe(
      res => {
        this.setUsersState(res);
      },
      err => {
        console.error('Error retrieving users', err);
      }
    );
  }

  updateUserGroupService(user: User): void {
    this.userService.updateUserGroup(user).subscribe(
      res => {
        this.getUsersService();
      },
      err => {
        console.error('Error updating users', err);
      }
    );
  }

  getUserGroupsState(): any {
    const vers = this._userGroups.getValue();
    return vers;
  }

  setUserGroupsState(userGroups) {
    this._userGroups.next(userGroups);
  }

  getUserGroupsService(): void {
    this.userGroupService.getUserGroup().subscribe(
      res => {
        this.setUserGroupsState(res);
      },
      err => {
        console.error('Error retrieving user groups', err);
      }
    );
  }
}
