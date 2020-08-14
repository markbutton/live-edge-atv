import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoneComponent } from './zone.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { getSessionStorage } from 'src/app/app.module';
import { ZoneState } from 'src/app/shared/state/zone/zone.state';
import { ZoneViewState } from 'src/app/shared/state/zone/zone-view.state';

describe('ZoneComponent', () => {
  let component: ZoneComponent;
  let fixture: ComponentFixture<ZoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ZoneComponent],
      imports: [
        BrowserAnimationsModule,
        HttpClientModule,
        RouterTestingModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatTableModule,
        MatPaginatorModule
      ],
      providers: [
        ZoneState,
        ZoneViewState,
        { provide: 'SESSIONSTORAGE', useFactory: getSessionStorage }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
