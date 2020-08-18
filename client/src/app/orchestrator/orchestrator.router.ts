import { Routes, RouterModule } from '@angular/router';

import { OrchestratorComponent } from './orchestrator.component';
import { TestComponent } from './components/test/test.component';
import { IdeComponent } from './components/ide/ide.component';

const orchestratorRoutes: Routes = [
    {
        path: '', component: OrchestratorComponent,
        children: [
            { path: '', redirectTo: 'ide', pathMatch: 'full' },
            { path: 'ide', component: IdeComponent },
            { path: 'test', component: TestComponent }
        ]
    },

    // otherwise redirect to home
    { path: '**', redirectTo: 'orchestrator' }
];

export const OrchestratorRouter = RouterModule.forChild(orchestratorRoutes);
