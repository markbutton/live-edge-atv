import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map.component';
import { MapViewState } from '../shared/state';

@NgModule({
  declarations: [MapComponent],
  imports: [
    CommonModule
  ],
  exports: [
    MapComponent
  ],
  providers: [
    MapViewState
  ]
})
export class MapModule { }
