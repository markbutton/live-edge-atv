import { Component, OnInit } from '@angular/core';

import * as state from 'src/app/shared/state';
import { NavView } from 'src/app/shared/models/nav/nav-view.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  constructor(private navViewState: state.NavViewState) { }

  ngOnInit(): void {
    this.subNav();
  }

  subNav(): void {
    const nav = new NavView();
    this.navViewState.createNavView(nav);
  }
}
