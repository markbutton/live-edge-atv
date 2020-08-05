import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagerRouter } from './manager.router';
import { ManagerComponent } from './manager.component';
import { JobsComponent } from './components/jobs/jobs.component';
import { ChannelLineupComponent } from './components/channel-lineup/channel-lineup.component';
import { JobEditComponent } from './components/job-edit/job-edit.component';

@NgModule({
  declarations: [
    ManagerComponent,
    JobsComponent,
    ChannelLineupComponent,
    JobEditComponent],
  imports: [
    CommonModule,
    ManagerRouter
  ],
  exports: [
    ManagerComponent
  ]
})
export class ManagerModule { }
