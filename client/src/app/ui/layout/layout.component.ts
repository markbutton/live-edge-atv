import { Component, OnInit } from '@angular/core';

import * as state from 'src/app/shared/state';
import { Observable } from 'rxjs';
import { NavView } from 'src/app/shared/models/nav/nav-view.model';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  navView: Observable<NavView>;

  constructor(private navViewState: state.NavViewState) { }

  ngOnInit(): void {
    this.navView = this.navViewState.navView;
  }

}
