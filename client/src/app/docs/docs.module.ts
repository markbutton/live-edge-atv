import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocsRouter } from './docs.router';
import { DocsComponent } from './docs.component';
import { UiDocsComponent } from './components/ui-docs/ui-docs.component';
import { ApiDocsComponent } from './components/api-docs/api-docs.component';
import { MsDocsComponent } from './components/ms-docs/ms-docs.component';


@NgModule({
  declarations: [
    DocsComponent,
    UiDocsComponent,
    ApiDocsComponent,
    MsDocsComponent
  ],
  imports: [
    CommonModule,
    DocsRouter
  ],
  exports: [
    DocsComponent
  ]
})
export class DocsModule { }
