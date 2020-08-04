import { Routes, RouterModule } from '@angular/router';

import { InventoryComponent } from './inventory.component';
import { TmcComponent } from './components/tmc/tmc.component';
import { TmcEditComponent } from './components/tmc-edit/tmc-edit.component';
import { TmcFilterComponent } from './components/tmc-filter/tmc-filter.component';
import { ZoneComponent } from './components/zone/zone.component';
import { ZoneEditComponent } from './components/zone-edit/zone-edit.component';
import { ZoneFilterComponent } from './components/zone-filter/zone-filter.component';

const inventoryRoutes: Routes = [
    {
        path: '', component: InventoryComponent,
        children: [
            { path: '', redirectTo: 'tmc', pathMatch: 'full' },
            { path: 'tmc', component: TmcComponent },
            { path: 'tmc-edit', component: TmcEditComponent },
            { path: 'tmc-edit/:id', component: TmcEditComponent },
            { path: 'tmc-filter', component: TmcFilterComponent },
            { path: 'zone', component: ZoneComponent },
            { path: 'zone-edit', component: ZoneEditComponent },
            { path: 'zone-edit/:id', component: ZoneEditComponent },
            { path: 'zone-filter', component: ZoneFilterComponent }
        ]
    }
];

export const InventoryRouter = RouterModule.forChild(inventoryRoutes);
