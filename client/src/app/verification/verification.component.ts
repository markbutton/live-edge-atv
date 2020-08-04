import { Component, OnInit } from '@angular/core';

import { NavViewState } from '../shared/state';
import { NavView } from '../shared/models/nav/nav-view.model';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss']
})
export class VerificationComponent implements OnInit {

  constructor(private navViewState: NavViewState) { }

  ngOnInit(): void {
    this.subNav();
  }

  subNav(): void {
    const nav = new NavView();
    this.navViewState.createNavView(nav);
  }
}
