import { Component, OnInit } from '@angular/core';

import * as state from 'src/app/shared/state';
import { NavView } from 'src/app/shared/models/nav/nav-view.model';
import { Link } from 'src/app/shared/models/nav/link.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private navViewState: state.NavViewState) { }

  ngOnInit(): void {
    this.subNav();
  }

  subNav(): void {
    const nav = new NavView();
    nav.subnav = true;
    nav.title = 'Settings';
    nav.links = new Array();
    const l1 = new Link();
    l1.name = 'Dashboard';
    l1.route = '/settings/dashboard';
    nav.links.push(l1);
    const l2 = new Link();
    l2.name = 'User Manager';
    l2.route = '/settings/user-manager';
    nav.links.push(l2);
    this.navViewState.createNavView(nav);
  }
}
