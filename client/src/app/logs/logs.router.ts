import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../shared/guards/auth.guard';
import { Role } from '../shared/models/user/role.model';

import { LogsComponent } from './logs.component';
import { FatalLogComponent } from './components/fatal-log/fatal-log.component';
import { ErrorLogComponent } from './components/error-log/error-log.component';
import { DebugLogComponent } from './components/debug-log/debug-log.component';
import { InfoLogComponent } from './components/info-log/info-log.component';
import { WarnLogComponent } from './components/warn-log/warn-log.component';
import { TrapLogComponent } from './components/trap-log/trap-log.component';

const logsRoutes: Routes = [
  {
    path: '', component: LogsComponent,
    children: [
      { path: '', redirectTo: 'fatal-log', pathMatch: 'full' },
      { path: 'error-log', component: ErrorLogComponent },
      { path: 'debug-log', component: DebugLogComponent, canActivate: [AuthGuard], data: { roles: [Role.developer] } },
      { path: 'fatal-log', component: FatalLogComponent },
      { path: 'info-log', component: InfoLogComponent },
      { path: 'warn-log', component: WarnLogComponent },
      { path: 'trap-log', component: TrapLogComponent },
    ]
  }

];

export const LogsRouter = RouterModule.forChild(logsRoutes);
