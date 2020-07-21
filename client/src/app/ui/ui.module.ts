import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { AppRoutingModule } from '../app-routing.module';

import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LayoutComponent } from './layout/layout.component';


@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    MatTooltipModule,
    MatProgressBarModule
  ],
  exports: [
    LayoutComponent
  ]
})
export class UiModule { }
