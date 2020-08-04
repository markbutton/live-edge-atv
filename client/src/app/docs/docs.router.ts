import { Routes, RouterModule } from '@angular/router';

import { DocsComponent } from './docs.component';
import { UiDocsComponent } from './components/ui-docs/ui-docs.component';
import { ApiDocsComponent } from './components/api-docs/api-docs.component';
import { MsDocsComponent } from './components/ms-docs/ms-docs.component';

const docsRoutes: Routes = [
  {
    path: '', component: DocsComponent,
    children: [
      { path: '', redirectTo: 'ui-docs', pathMatch: 'full' },
      { path: 'ui-docs', component: UiDocsComponent },
      { path: 'api-docs', component: ApiDocsComponent },
      { path: 'ms-docs', component: MsDocsComponent }
    ]
  }
];

export const DocsRouter = RouterModule.forChild(docsRoutes);
