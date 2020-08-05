import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { NavView } from '../../models/nav/nav-view.model';
import { NavService } from 'src/app/shared/services/nav/nav.service';

@Injectable()
export class NavViewState {
  // Model
  // tslint:disable-next-line: variable-name
  private _navView: BehaviorSubject<NavView> = new BehaviorSubject(Object());
  public navView: Observable<NavView> = this._navView.asObservable();

  // Controller
  constructor(private navService: NavService) {
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

  changeNavView(url: string): void {
    this.navService.setNav(url).then((value) => {
      this.setNavView(value);
    });
  }

  routeChange(url: string): void {
    switch (url) {
      case '/inventory/tmc':
        this.changeNavView('assets/data/tmc-data.json');
        break;
      case '/inventory/tmc-edit':
        this.changeNavView('assets/data/tmc-data.json');
        break;
      case '/inventory/zone':
        this.changeNavView('assets/data/zone-data.json');
        break;
      case '/inventory/zone-edit':
        this.changeNavView('assets/data/zone-data.json');
        break;
      case '/docs/ui-docs':
        this.changeNavView('assets/data/docs-data.json');
        break;
      case '/docs/api-docs':
        this.changeNavView('assets/data/docs-data.json');
        break;
      case '/docs/ms-docs':
        this.changeNavView('assets/data/docs-data.json');
        break;
      case '/logs/fatal-log':
        this.changeNavView('assets/data/logs-data.json');
        break;
      case '/logs/error-log':
        this.changeNavView('assets/data/logs-data.json');
        break;
      case '/logs/warn-log':
        this.changeNavView('assets/data/logs-data.json');
        break;
      case '/logs/info-log':
        this.changeNavView('assets/data/logs-data.json');
        break;
      case '/logs/debug-log':
        this.changeNavView('assets/data/logs-data.json');
        break;
      case '/logs/trap-log':
        this.changeNavView('assets/data/logs-data.json');
        break;
      case '/settings/dashboard':
        this.changeNavView('assets/data/settings-data.json');
        break;
      case '/settings/user-manager':
        this.changeNavView('assets/data/settings-data.json');
        break;
      case '/manager/jobs':
        this.changeNavView('assets/data/manager-data.json');
        break;
      case '/manager/job-edit':
        this.changeNavView('assets/data/manager-data.json');
        break;
      case '/manager/channel-lineup':
        this.changeNavView('assets/data/manager-data.json');
        break;
      default:
        const nv = new NavView();
        this.setNavView(nv);
        break;
    }
  }

}
