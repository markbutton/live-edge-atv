import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { IdeView } from '../../models/ide/ide-view.model';

@Injectable()
export class IdeViewState {
  // State Model
  private _ideView: BehaviorSubject<IdeView> = new BehaviorSubject(Object());
  public ideView: Observable<IdeView> = this._ideView.asObservable();

  constructor() {
    this.loadInitialData();
  }

  // State Controller
  public loadInitialData(): void {
    this.getIdeViewService();
  }

  getIdeViewService(): void {
    const viewState = new IdeView();
    this._ideView.next(viewState);
  }

  getIdeView(): IdeView {
    const viewState = this._ideView.getValue();
    return viewState;
  }

  public changeView(view: string): void {
    const viewState = this.getIdeView();
    viewState.view = view;
    this._ideView.next(viewState);
  }

}
