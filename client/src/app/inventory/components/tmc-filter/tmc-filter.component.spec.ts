import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { RouterTestingModule } from '@angular/router/testing';

import { TmcFilterComponent } from './tmc-filter.component';
import { EquipmentState, JobsState } from '../../../shared/state';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { getSessionStorage } from 'src/app/app.module';
import { SocketAPI } from 'src/app/shared/modules/socket.module';

describe('TmcFilterComponent', () => {
  let component: TmcFilterComponent;
  let fixture: ComponentFixture<TmcFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TmcFilterComponent
      ],
      imports: [
        HttpClientModule,
        MatFormFieldModule,
        MatDialogModule,
        MatPaginatorModule,
        MatTableModule,
        PipesModule,
        RouterTestingModule
      ],
      providers: [
        EquipmentState,
        JobsState,
        SocketAPI,
        { provide: 'SESSIONSTORAGE', useFactory: getSessionStorage }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TmcFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
