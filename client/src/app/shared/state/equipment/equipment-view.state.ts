import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { EquipmentView } from '../../models/equipment/equipment-view.model';

@Injectable()
export class EquipmentViewState {
  // State Model
  private _equipmentView: BehaviorSubject<EquipmentView> = new BehaviorSubject(Object());
  public equipmentView: Observable<EquipmentView> = this._equipmentView.asObservable();

  constructor(@Inject('SESSIONSTORAGE') private sessionStorage: any) {
    this.loadInitialData();
  }

  // State Controller
  public loadInitialData(): void {
    const sessionEquipmentView = this.sessionStorage.getItem('equipmentView');
    if (sessionEquipmentView) {
      this.getEquipmentViewSession();
    } else {
      this.getEquipmentViewService();
    }
  }

  getEquipmentViewService(): void {
    const viewState = new EquipmentView();
    this._equipmentView.next(viewState);
    this.sessionStorage.setItem('equipmentView', JSON.stringify(viewState));
  }

  getEquipmentViewSession(): void {
    const sessionView = sessionStorage.getItem('equipmentView');
    this._equipmentView.next(JSON.parse(sessionView));
  }

  getEquipmentViewState(): EquipmentView {
    const evs = this._equipmentView.getValue();
    return evs;
  }

  setEquipmentViewState(viewState: EquipmentView): void {
    this._equipmentView.next(viewState);
    this.sessionStorage.setItem('equipmentView', JSON.stringify(viewState));
  }

}

