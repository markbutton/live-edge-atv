import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { KeycloakAngularModule } from 'keycloak-angular';

import { AppRoutingModule } from './app-routing.module';
import { UiModule } from './ui/ui.module';
import { AppComponent } from './app.component';
import * as state from './shared/state';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    KeycloakAngularModule,
    UiModule
  ],
  providers: [
    state.UserState,
    { provide: 'LOCALSTORAGE', useFactory: getLocalStorage },
    { provide: 'SESSIONSTORAGE', useFactory: getSessionStorage },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function getLocalStorage(): any {
  return typeof window !== 'undefined' ? window.localStorage : null;
}

export function getSessionStorage(): any {
  return typeof window !== 'undefined' ? window.sessionStorage : null;
}
