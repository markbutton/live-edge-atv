import { Component, OnInit } from '@angular/core';

import { NavViewState } from '../shared/state';
import { NavView } from '../shared/models/nav/nav-view.model';

@Component({
  selector: 'app-quality',
  templateUrl: './quality.component.html',
  styleUrls: ['./quality.component.scss']
})
export class QualityComponent implements OnInit {

  constructor(private navViewState: NavViewState) { }

  ngOnInit(): void {
    this.subNav();
  }

  subNav(): void {
    const nav = new NavView();
    this.navViewState.createNavView(nav);
  }
}
