import { Component, OnInit } from '@angular/core';

import * as state from 'src/app/shared/state';
import { NavView } from 'src/app/shared/models/nav/nav-view.model';
import { Link } from 'src/app/shared/models/nav/link.model';

@Component({
  selector: 'app-debug-log',
  templateUrl: './debug-log.component.html',
  styleUrls: ['./debug-log.component.scss']
})
export class DebugLogComponent implements OnInit {

  constructor(private navViewState: state.NavViewState) { }

  ngOnInit(): void {
    this.subNav();
  }

  subNav(): void {
    const nav = new NavView();
    nav.subnav = true;
    nav.title = 'Logs';
    nav.links = new Array();
    const l1 = new Link();
    l1.name = 'Fatal';
    l1.route = '/logs/fatal-log';
    nav.links.push(l1);
    const l2 = new Link();
    l2.name = 'Error';
    l2.route = '/logs/error-log';
    nav.links.push(l2);
    const l3 = new Link();
    l3.name = 'Warn';
    l3.route = '/logs/warn-log';
    nav.links.push(l3);
    const l4 = new Link();
    l4.name = 'Info';
    l4.route = '/logs/info-log';
    nav.links.push(l4);
    const l5 = new Link();
    l5.name = 'Debug';
    l5.route = '/logs/debug-log';
    nav.links.push(l5);
    const l6 = new Link();
    l6.name = 'Trap';
    l6.route = '/logs/trap-log';
    nav.links.push(l6);
    this.navViewState.createNavView(nav);
  }
}
