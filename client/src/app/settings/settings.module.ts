import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRouter } from './settings.router';
import { SettingsComponent } from './settings.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserManagerComponent } from './components/user-manager/user-manager.component';
import { SettingsState } from '../shared/state';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';

@NgModule({
  declarations: [
    SettingsComponent,
    UserManagerComponent,
    DashboardComponent,
    UserManagerComponent
  ],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatRadioModule,
    CommonModule,
    SettingsRouter
  ],
  exports: [
    SettingsComponent
  ],
  providers: [
    SettingsState
  ]
})
export class SettingsModule { }
