import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelLineupComponent } from './channel-lineup.component';

describe('ChannelLineupComponent', () => {
  let component: ChannelLineupComponent;
  let fixture: ComponentFixture<ChannelLineupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChannelLineupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelLineupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
