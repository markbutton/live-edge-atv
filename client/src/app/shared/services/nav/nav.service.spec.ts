import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { NavService } from './nav.service';

describe('NavService', () => {
  let service: NavService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ]
    });
    service = TestBed.inject(NavService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
