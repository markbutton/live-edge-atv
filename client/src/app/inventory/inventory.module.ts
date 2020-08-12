import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';

import { InventoryRouter } from './inventory.router';
import { InventoryComponent } from './inventory.component';
import { TmcComponent } from './components/tmc/tmc.component';
import { ZoneComponent } from './components/zone/zone.component';
import { TmcEditComponent } from './components/tmc-edit/tmc-edit.component';
import { TmcFilterComponent } from './components/tmc-filter/tmc-filter.component';
import { ZoneEditComponent } from './components/zone-edit/zone-edit.component';
import { ZoneFilterComponent } from './components/zone-filter/zone-filter.component';
import { InvNavComponent } from './components/inv-nav/inv-nav.component';
import { SharedModule } from '../shared/modules/shared.module';
import { EquipmentViewState } from '../shared/state';
import { PipesModule } from '../shared/pipes/pipes.module';

@NgModule({
  declarations: [
    InventoryComponent,
    TmcComponent,
    ZoneComponent,
    TmcEditComponent,
    TmcFilterComponent,
    InvNavComponent,
    ZoneEditComponent,
    ZoneFilterComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
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
  ],
  exports: [
    InventoryComponent
  ],
  providers: [
    EquipmentViewState
  ]
})
export class InventoryModule { }
