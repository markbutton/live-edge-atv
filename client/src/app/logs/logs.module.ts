import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogsRouter } from './logs.router';
import { LogsComponent } from './logs.component';
import { FatalLogComponent } from './components/fatal-log/fatal-log.component';
import { ErrorLogComponent } from './components/error-log/error-log.component';
import { DebugLogComponent } from './components/debug-log/debug-log.component';
import { InfoLogComponent } from './components/info-log/info-log.component';
import { WarnLogComponent } from './components/warn-log/warn-log.component';
import { TrapLogComponent } from './components/trap-log/trap-log.component';



@NgModule({
  declarations: [
    LogsComponent,
    FatalLogComponent,
    ErrorLogComponent,
    DebugLogComponent,
    InfoLogComponent,
    WarnLogComponent,
    TrapLogComponent
  ],
  imports: [
    CommonModule,
    LogsRouter
  ],
  exports: [
    LogsComponent
  ]
})
export class LogsModule { }
