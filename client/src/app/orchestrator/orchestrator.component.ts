import { Component, OnInit } from '@angular/core';

import { NavViewState } from '../shared/state';
import { NavView } from '../shared/models/nav/nav-view.model';

@Component({
  selector: 'app-orchestrator',
  templateUrl: './orchestrator.component.html',
  styleUrls: ['./orchestrator.component.scss']
})
export class OrchestratorComponent implements OnInit {

  constructor(private navViewState: NavViewState) { }

  ngOnInit(): void {
    this.subNav();
  }

  subNav(): void {
    const nav = new NavView();
    this.navViewState.createNavView(nav);
  }
}
