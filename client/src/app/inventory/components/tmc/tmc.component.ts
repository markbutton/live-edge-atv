import { Component, OnInit } from '@angular/core';

import * as state from 'src/app/shared/state';
import { NavView } from 'src/app/shared/models/nav/nav-view.model';
import { Link } from 'src/app/shared/models/nav/link.model';

@Component({
  selector: 'app-tmc',
  templateUrl: './tmc.component.html',
  styleUrls: ['./tmc.component.scss']
})
export class TmcComponent implements OnInit {

  constructor(private navViewState: state.NavViewState) { }

  ngOnInit(): void {
    this.subNav();
  }

  subNav(): void {
    const nav = new NavView();
    nav.subnav = true;
    nav.title = 'Inventory Manager';
    nav.links = new Array();
    const l1 = new Link();
    l1.name = 'TMC';
    l1.route = '/inventory/tmc';
    nav.links.push(l1);
    const l2 = new Link();
    l2.name = 'Zone';
    l2.route = '/inventory/zone';
    nav.links.push(l2);
    const l3 = new Link();
    l3.name = 'Add TMC';
    l3.route = '/inventory/tmc-edit';
    nav.links.push(l3);
    this.navViewState.createNavView(nav);
  }

}
