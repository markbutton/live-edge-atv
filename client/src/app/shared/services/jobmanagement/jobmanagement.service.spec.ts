import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { JobManagementService } from './jobmanagement.service';

describe('JobManagementService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule
    ]
  }));

  it('should be created', () => {
    const service: JobManagementService = TestBed.inject(JobManagementService);
    expect(service).toBeTruthy();
  });
});
