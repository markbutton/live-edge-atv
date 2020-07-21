import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create Footer Component', () => {
    expect(component).toBeTruthy();
  });

  it('should render a copyright symbol', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.query(By.css('i')).nativeElement;
    const css = compiled.getAttribute('class');
    expect(css).toEqual('fa fa-copyright');
  });

  it('should render Charter Communications. in an a tag', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('a').textContent).toContain('Charter Communications.');
  });

  it('should render All rights reserved. in a div tag', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('div').textContent).toContain('All rights reserved.');
  });

  it('should render link to https://www.spectrum.com/', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.query(By.css('a')).nativeElement;
    const href = compiled.getAttribute('href');
    expect(href).toEqual('https://www.spectrum.com/');
  });

});
