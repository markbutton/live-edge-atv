import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inv-nav',
  templateUrl: './inv-nav.component.html',
  styleUrls: ['./inv-nav.component.scss']
})
export class InvNavComponent implements OnInit {
  navbarOpen = false;
  currentRoute: any;

  constructor(private router: Router) { }

  ngOnInit() {
    this.currentRoute = this.router.url;
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

}
