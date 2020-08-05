import { Component, OnInit } from '@angular/core';

import * as state from 'src/app/shared/state';
import { NavView } from 'src/app/shared/models/nav/nav-view.model';
import { Link } from 'src/app/shared/models/nav/link.model';

@Component({
  selector: 'app-job-edit',
  templateUrl: './job-edit.component.html',
  styleUrls: ['./job-edit.component.scss']
})
export class JobEditComponent implements OnInit {

  constructor(private navViewState: state.NavViewState) { }

  ngOnInit(): void {
    this.subNav();
  }

  subNav(): void {
    const nav = new NavView();
    nav.subnav = true;
    nav.title = 'Job Manager';
    nav.links = new Array();
    const l1 = new Link();
    l1.name = 'Jobs';
    l1.route = '/manager/jobs';
    nav.links.push(l1);
    const l2 = new Link();
    l2.name = 'Channel Lineup';
    l2.route = '/manager/channel-lineup';
    nav.links.push(l2);
    const l3 = new Link();
    l3.name = 'Add Job';
    l3.route = '/manager/job-edit';
    nav.links.push(l3);
    this.navViewState.createNavView(nav);
  }
}
