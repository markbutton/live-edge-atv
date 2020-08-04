import { Component, Input, OnInit } from '@angular/core';
import { NavView } from 'src/app/shared/models/nav/nav-view.model';

@Component({
  selector: 'app-sub-nav',
  templateUrl: './sub-nav.component.html',
  styleUrls: ['./sub-nav.component.scss']
})
export class SubNavComponent implements OnInit {

  @Input() navView: NavView;

  constructor() { }

  ngOnInit(): void {
    console.log('get the nav object: ', this.navView.title);
  }

}
