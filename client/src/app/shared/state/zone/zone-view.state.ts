import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { ZoneView } from '../../models/equipment/zone-view.model';

@Injectable()
export class ZoneViewState {
  // State Model
  private _zoneView: BehaviorSubject<ZoneView> = new BehaviorSubject(Object());
  public zoneView: Observable<ZoneView> = this._zoneView.asObservable();

  constructor(@Inject('SESSIONSTORAGE') private sessionStorage: any) {
    this.loadInitialData();
  }

  // State Controller
  public loadInitialData(): void {
    const sessionZoneView = this.sessionStorage.getItem('zoneView');
    if (sessionZoneView) {
      this.getZoneViewSession();
    } else {
      this.getZoneViewService();
    }
  }

  getZoneViewService(): void {
    const viewState = new ZoneView();
    this._zoneView.next(viewState);
    this.sessionStorage.setItem('zoneView', JSON.stringify(viewState));
  }

  getZoneViewSession(): void {
    const sessionView = sessionStorage.getItem('zoneView');
    this._zoneView.next(JSON.parse(sessionView));
  }

  getZoneViewState(): ZoneView {
    const evs = this._zoneView.getValue();
    return evs;
  }

  setZoneViewState(viewState: ZoneView) {
    this._zoneView.next(viewState);
    this.sessionStorage.setItem('zoneView', JSON.stringify(viewState));
  }

}

