import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { MatTooltipModule } from '@angular/material/tooltip';

import { HeaderComponent } from './header.component';
import { AuthMockService } from 'src/app/shared/services/auth-mock.service';
import { UserState } from 'src/app/shared/state';
import { getSessionStorage, getLocalStorage } from '../../app.module';
import { KeycloakService } from 'keycloak-angular';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  // let authService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HeaderComponent
      ],
      imports: [
        HttpClientModule,
        RouterTestingModule,
        MatTooltipModule
      ],
      providers: [
        AuthMockService,
        KeycloakService,
        UserState,
        { provide: 'SESSIONSTORAGE', useFactory: getSessionStorage },
        { provide: 'LOCALSTORAGE', useFactory: getLocalStorage }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the header component', () => {
    expect(component).toBeTruthy();
  });

  it('should render a Live Edge link with route /', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.query(By.css('a[id="title"]')).nativeElement;
    const href = compiled.getAttribute('href');
    expect(href).toEqual('/');
    expect(compiled.textContent).toContain('Live Edge');
  });

/*   it('should render an ulock icon with route /login for logged out user', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.query(By.css('a[id="unlock"]')).nativeElement;
    const routerlink = compiled.getAttribute('routerlink');
    const css = compiled.querySelector('i').getAttribute('class');
    expect(routerlink).toEqual('/login');
    expect(css).toEqual('fa fa-unlock');
  }); */

/*   it('should render a zones link with route /zones for logged in user', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.query(By.css('a[id="zones"]')).nativeElement;
    const routerLink = compiled.getAttribute('routerLink');
    expect(routerLink).toEqual('/zones');
    expect(compiled.textContent).toContain('Zones');
  }); */

});
