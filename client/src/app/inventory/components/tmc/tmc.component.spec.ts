import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HAMMER_LOADER } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

import { TmcComponent } from './tmc.component';
import { EquipmentState, JobsState, EquipmentViewState } from '../../../shared/state';
import { PipesModule } from '../../../shared/pipes/pipes.module';
import { SharedModule } from '../../../shared/modules/shared.module';
import { getSessionStorage } from '../../../app.module';

describe('TmcComponent', () => {
  let component: TmcComponent;
  let fixture: ComponentFixture<TmcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TmcComponent
      ],
      imports: [
        BrowserAnimationsModule,
        HttpClientModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatPaginatorModule,
        MatProgressSpinnerModule,
        MatSortModule,
        MatTableModule,
        RouterTestingModule,
        SharedModule,
        PipesModule
      ],
      providers: [
        EquipmentState,
        EquipmentViewState,
        JobsState,
        { provide: 'SESSIONSTORAGE', useFactory: getSessionStorage },
        { provide: HAMMER_LOADER, useValue: () => new Promise(() => { }) }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TmcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
