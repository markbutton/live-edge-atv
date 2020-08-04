import { Component, OnInit } from '@angular/core';

import { NavViewState } from '../shared/state';
import { NavView } from '../shared/models/nav/nav-view.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  constructor(private navViewState: NavViewState) { }

  ngOnInit(): void {
    this.subNav();
  }

  subNav(): void {
    const nav = new NavView();
    nav.subnav = false;
    nav.title = '';
    nav.links = [];
    this.navViewState.createNavView(nav);
  }

}
