import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './shared/guards/auth.guard';
import { Role } from './shared/models/user/role.model';
import { HomeComponent } from './home/home.component';
import { VerificationComponent } from './verification/verification.component';
import { OrchestratorComponent } from './orchestrator/orchestrator.component';
import { QualityComponent } from './quality/quality.component';
import { MapComponent } from './map/map.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'map', component: MapComponent, canActivate: [AuthGuard],
    data: { roles: [Role.developer, Role.admin, Role.user, Role.poweruser] }
  },
  {
    path: 'orchestrator', loadChildren: () => import('./orchestrator/orchestrator.module').then(m => m.OrchestratorModule),
    canActivate: [AuthGuard], data: { roles: [Role.developer] }
  },
  {
    path: 'inventory', loadChildren: () => import('./inventory/inventory.module').then(m => m.InventoryModule),
    canActivate: [AuthGuard], data: { roles: [Role.developer, Role.admin, Role.user, Role.poweruser] }
  },
  {
    path: 'manager', loadChildren: () => import('./manager/manager.module').then(m => m.ManagerModule), canActivate: [AuthGuard],
    data: { roles: [Role.developer, Role.admin, Role.poweruser] }
  },
  {
    path: 'logs', loadChildren: () => import('./logs/logs.module').then(m => m.LogsModule), canActivate: [AuthGuard],
    data: { roles: [Role.developer, Role.admin, Role.user, Role.poweruser] }
  },
  {
    path: 'docs', loadChildren: () => import('./docs/docs.module').then(m => m.DocsModule), canActivate: [AuthGuard],
    data: { roles: [Role.developer, Role.admin, Role.user, Role.poweruser] }
  },
  {
    path: 'verification', component: VerificationComponent, canActivate: [AuthGuard],
    data: { roles: [Role.developer, Role.admin, Role.user, Role.poweruser] }
  },
  {
    path: 'quality', component: QualityComponent, canActivate: [AuthGuard],
    data: { roles: [Role.developer, Role.admin, Role.user, Role.poweruser] }
  },
  {
    path: 'settings', loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule),
    canActivate: [AuthGuard], data: { roles: [Role.developer, Role.admin] }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    { scrollPositionRestoration: 'enabled' }
  )],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
