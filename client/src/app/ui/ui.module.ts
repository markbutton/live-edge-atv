import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { AppRoutingModule } from '../app-routing.module';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LayoutComponent } from './layout/layout.component';
import { SubNavComponent } from './sub-nav/sub-nav.component';
import { NavViewState } from '../shared/state';

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    LayoutComponent,
    SubNavComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    MatTooltipModule,
    MatProgressBarModule
  ],
  exports: [
    LayoutComponent
  ],
  providers: [
    NavViewState
  ]
})
export class UiModule { }
