import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { MapView } from '../../models/map/map-view.model';

@Injectable()
export class MapViewState {
  // State Model
  private _mapView: BehaviorSubject<MapView> = new BehaviorSubject(Object());
  public mapView: Observable<MapView> = this._mapView.asObservable();

  constructor() {
    this.loadInitialData();
  }

  // State Controller
  public loadInitialData(): void {
    const viewState = new MapView();
    this._mapView.next(viewState);
  }

  getMapViewState(): MapView {
    const mvs = this._mapView.getValue();
    return mvs;
  }

  setMapViewState(viewState: MapView) {
    this._mapView.next(viewState);
  }

}

