import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventoryRouter } from './inventory.router';
import { InventoryComponent } from './inventory.component';
import { TmcComponent } from './components/tmc/tmc.component';
import { ZoneComponent } from './components/zone/zone.component';
import { TmcEditComponent } from './components/tmc-edit/tmc-edit.component';
import { TmcFilterComponent } from './components/tmc-filter/tmc-filter.component';
import { ZoneEditComponent } from './components/zone-edit/zone-edit.component';
import { ZoneFilterComponent } from './components/zone-filter/zone-filter.component';



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
    InventoryRouter
  ],
  exports: [
    InventoryComponent
  ]
})
export class InventoryModule { }
