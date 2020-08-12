import { Component } from '@angular/core';

@Component({
  selector: 'app-scroll-top-button',
  templateUrl: './scroll-top-button.component.html',
  styleUrls: ['./scroll-top-button.component.scss']
})
export class ScrollTopButtonComponent {

  constructor() { }

  scrollTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

}
