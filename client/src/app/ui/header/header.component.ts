import { Component, OnInit } from '@angular/core';
import { UserState } from 'src/app/shared/state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  navbarOpen = true;
  isDeveloper = false;
  isAdmin = false;
  isDefault = false;
  isOk = false;
  isUser = false;

  constructor(private userState: UserState) { }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  ngOnInit() {
    // const currentUser = this.userState.getCurrentUser();
    this.userState.user.subscribe((user) => {
      if (user) {
        const currentGroup = user.group;
        if (currentGroup === 'developer') {
          this.isDeveloper = true;
        } else if (currentGroup === 'admin') {
          this.isAdmin = true;
        } else if (currentGroup === 'default') {
          this.isDefault = true;
        } else if (currentGroup === 'user') {
          this.isUser = true;
        }

        if (currentGroup === 'developer' || currentGroup === 'admin') {
          this.isOk = true;
        }
      }
    });
  }

}
