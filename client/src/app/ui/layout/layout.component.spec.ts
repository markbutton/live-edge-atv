import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { MatTooltipModule } from '@angular/material/tooltip';

import { LayoutComponent } from './layout.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { UserState, NavViewState } from 'src/app/shared/state';
import { getSessionStorage, getLocalStorage } from '../../app.module';
import { KeycloakService } from 'keycloak-angular';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LayoutComponent, HeaderComponent, FooterComponent],
      imports: [HttpClientModule, RouterTestingModule, MatTooltipModule],
      providers: [
        NavViewState,
        KeycloakService,
        UserState,
        { provide: 'SESSIONSTORAGE', useFactory: getSessionStorage },
        { provide: 'LOCALSTORAGE', useFactory: getLocalStorage },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
