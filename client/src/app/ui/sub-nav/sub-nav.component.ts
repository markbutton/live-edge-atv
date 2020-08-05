import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NavView } from 'src/app/shared/models/nav/nav-view.model';

@Component({
  selector: 'app-sub-nav',
  templateUrl: './sub-nav.component.html',
  styleUrls: ['./sub-nav.component.scss']
})
export class SubNavComponent implements OnInit {
  navbarOpen = false;
  currentRoute: any;
  links = new Array();

  @Input() navView: NavView;

  constructor(
    private router: Router) { }

  ngOnInit(): void {
    this.currentRoute = this.router.url;
    if (this.navView) {
      this.links = this.navView.links;
    }
  }

  toggleNavbar(): void {
    this.navbarOpen = !this.navbarOpen;
  }

}
