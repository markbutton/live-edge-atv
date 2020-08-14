import { TestBed } from '@angular/core/testing';

import { ZonePolyService } from './zone-poly.service';
import { HttpClientModule } from '@angular/common/http';

describe('ZonePolyService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule
    ]
  }));

  it('should be created', () => {
    const service: ZonePolyService = TestBed.get(ZonePolyService);
    expect(service).toBeTruthy();
  });
});
