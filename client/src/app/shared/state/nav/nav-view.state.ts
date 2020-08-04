import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { NavView } from '../../models/nav/nav-view.model';

@Injectable()
export class NavViewState {
  // Model
  // tslint:disable-next-line: variable-name
  private _navView: BehaviorSubject<NavView> = new BehaviorSubject(Object());
  public navView: Observable<NavView> = this._navView.asObservable();

  // Controller
  constructor() {
    this.getInitialNavView();
  }

  // State Controller
  async getInitialNavView(): Promise<any> {
    const nv = new NavView();
    this.setNavView(nv);
  }

  getNavView(): NavView {
    const nv = this._navView.getValue();
    return nv;
  }

  setNavView(nv: NavView): void {
    this._navView.next(nv);
  }

  createNavView(view: NavView): void {
    this.setNavView(view);
  }

}
