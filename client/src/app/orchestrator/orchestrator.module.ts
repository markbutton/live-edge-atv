import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrchestratorComponent } from './orchestrator.component';



@NgModule({
  declarations: [OrchestratorComponent],
  imports: [
    CommonModule
  ],
  exports: [
    OrchestratorComponent
  ]
})
export class OrchestratorModule { }
