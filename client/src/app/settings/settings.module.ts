import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRouter } from './settings.router';
import { SettingsComponent } from './settings.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserManagerComponent } from './components/user-manager/user-manager.component';

@NgModule({
  declarations: [
    SettingsComponent,
    UserManagerComponent,
    DashboardComponent,
    UserManagerComponent
  ],
  imports: [
    CommonModule,
    SettingsRouter
  ],
  exports: [
    SettingsComponent
  ]
})
export class SettingsModule { }
