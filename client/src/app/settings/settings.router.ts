import { Routes, RouterModule } from '@angular/router';

import { SettingsComponent } from './settings.component';
import { UserManagerComponent } from './components/user-manager/user-manager.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const settingRoutes: Routes = [
  {
    path: '', component: SettingsComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'user-manager', component: UserManagerComponent }
    ]
  },
];

export const SettingsRouter = RouterModule.forChild(settingRoutes);
