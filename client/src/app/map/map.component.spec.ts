import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { EquipmentState, JobsState, ZoneState, MapViewState } from '../shared/state';
import { getSessionStorage } from '../app.module';
import { MapComponent } from './map.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MapComponent
      ],
      imports: [
        HttpClientModule,
        RouterTestingModule
      ],
      providers: [
        EquipmentState,
        ZoneState,
        JobsState,
        MapViewState,
        { provide: 'SESSIONSTORAGE', useFactory: getSessionStorage }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
