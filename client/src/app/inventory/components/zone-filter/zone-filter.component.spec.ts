import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';

import { ZoneFilterComponent } from './zone-filter.component';
import { ZoneState } from 'src/app/shared/state';

describe('ZoneFilterComponent', () => {
  let component: ZoneFilterComponent;
  let fixture: ComponentFixture<ZoneFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ZoneFilterComponent
      ],
      imports: [
        HttpClientModule,
        MatDialogModule,
        MatTableModule,
        RouterTestingModule
      ],
      providers: [
        ZoneState
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoneFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
