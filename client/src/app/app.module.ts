import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { KeycloakAngularModule } from 'keycloak-angular';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { ConfirmModalComponent } from './shared/components/confirm-modal/confirm-modal.component';

import { AppRoutingModule } from './app-routing.module';
import { UiModule } from './ui/ui.module';
import { AppComponent } from './app.component';
import * as state from './shared/state';


@NgModule({
  declarations: [
    AppComponent,
    ConfirmModalComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    KeycloakAngularModule,
    UiModule,
    MatButtonModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
  ],
  providers: [
    state.UserState,
    state.JobsState,
    state.EquipmentState,
    { provide: 'LOCALSTORAGE', useFactory: getLocalStorage },
    { provide: 'SESSIONSTORAGE', useFactory: getSessionStorage },
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ConfirmModalComponent,
  ]
})
export class AppModule { }

export function getLocalStorage(): any {
  return typeof window !== 'undefined' ? window.localStorage : null;
}

export function getSessionStorage(): any {
  return typeof window !== 'undefined' ? window.sessionStorage : null;
}
