import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StripDomainPipe } from './strip-domain.pipe';

@NgModule({
  declarations: [
    StripDomainPipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    StripDomainPipe,
  ]
})
export class PipesModule { }
