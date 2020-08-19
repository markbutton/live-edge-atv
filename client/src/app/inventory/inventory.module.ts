import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { ToastrModule } from 'ngx-toastr';

import { InventoryRouter } from './inventory.router';
import { InventoryComponent } from './inventory.component';
import { TmcComponent } from './components/tmc/tmc.component';
import { ZoneComponent } from './components/zone/zone.component';
import { TmcEditComponent } from './components/tmc-edit/tmc-edit.component';
import { TmcFilterComponent } from './components/tmc-filter/tmc-filter.component';
import { ZoneEditComponent } from './components/zone-edit/zone-edit.component';
import { ZoneFilterComponent } from './components/zone-filter/zone-filter.component';
import { SharedModule } from '../shared/modules/shared.module';
import { EquipmentViewState, ZoneViewState } from '../shared/state';
import { PipesModule } from '../shared/pipes/pipes.module';
import { DirectiveModule } from '../shared/directives/directive.module';

@NgModule({
  declarations: [
    InventoryComponent,
    TmcComponent,
    ZoneComponent,
    TmcEditComponent,
    TmcFilterComponent,
    ZoneEditComponent,
    ZoneFilterComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DirectiveModule,
    InventoryRouter,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule,
    PipesModule,
    ReactiveFormsModule,
    ToastrModule.forRoot()
  ],
  exports: [
    InventoryComponent
  ],
  providers: [
    EquipmentViewState,
    ZoneViewState
  ]
})
export class InventoryModule { }
