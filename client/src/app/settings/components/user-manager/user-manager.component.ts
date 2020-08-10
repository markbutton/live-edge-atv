import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import * as state from '../../../shared/state';
import { User } from 'src/app/shared/models/user/user.model';
import { UserGroup } from 'src/app/shared/models/user/userGroup.model';

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.scss']
})
export class UserManagerComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'usergroup'];

  dataSource: any;
  userGroups: UserGroup[] = [];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private settingsState: state.SettingsState, public dialog: MatDialog) { }

  ngOnInit() {
    this.getUserGroup();
    this.settingsState.users.subscribe(
      (users: User[]) => {
        if (users.length > 0) {
          this.dataSource = new MatTableDataSource(users);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      }
    );
  }

  getUserGroup() {
    this.settingsState.userGroups.subscribe(
      (userGroups: UserGroup[]) => {
        if (userGroups.length > 0) {
          this.userGroups = userGroups;
        }
      }
    );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onUserGroupChange(user: User) {
    this.settingsState.updateUserGroupService(user);
  }

}
