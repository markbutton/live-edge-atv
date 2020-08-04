import { Component, OnInit } from '@angular/core';

import * as state from 'src/app/shared/state';
import { NavView } from 'src/app/shared/models/nav/nav-view.model';
import { Link } from 'src/app/shared/models/nav/link.model';

@Component({
  selector: 'app-ms-docs',
  templateUrl: './ms-docs.component.html',
  styleUrls: ['./ms-docs.component.scss']
})
export class MsDocsComponent implements OnInit {

  constructor(private navViewState: state.NavViewState) { }

  ngOnInit(): void {
    this.subNav();
  }

  subNav(): void {
    const nav = new NavView();
    nav.subnav = true;
    nav.title = 'Documentation';
    nav.links = new Array();
    const l1 = new Link();
    l1.name = 'User Docs';
    l1.route = '/docs/ui-docs';
    nav.links.push(l1);
    const l2 = new Link();
    l2.name = 'API Docs';
    l2.route = '/docs/api-docs';
    nav.links.push(l2);
    const l3 = new Link();
    l3.name = 'Microservice Docs';
    l3.route = '/docs/ms-docs';
    nav.links.push(l3);
    this.navViewState.createNavView(nav);
  }
}
