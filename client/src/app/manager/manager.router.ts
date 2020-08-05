import { Routes, RouterModule } from '@angular/router';

import { ManagerComponent } from './manager.component';
import { ChannelLineupComponent } from './components/channel-lineup/channel-lineup.component';
import { JobsComponent } from './components/jobs/jobs.component';
import { JobEditComponent } from './components/job-edit/job-edit.component';

const managerRoutes: Routes = [
    {
        path: '', component: ManagerComponent,
        children: [
            { path: '', redirectTo: 'jobs', pathMatch: 'full' },
            { path: 'jobs', component: JobsComponent },
            { path: 'job-edit', component: JobEditComponent },
            { path: 'job-edit/:id', component: JobEditComponent },
            { path: 'channel-lineup', component: ChannelLineupComponent }
        ]
    },

    // otherwise redirect to home
    { path: '**', redirectTo: 'manager' }
];

export const ManagerRouter = RouterModule.forChild(managerRoutes);
