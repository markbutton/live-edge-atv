import { TestBed } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';
import { UserGroupService } from './userGroup.service';

describe('UserGroupService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule
    ]
  }));

  it('should be created', () => {
    const service: UserGroupService = TestBed.get(UserGroupService);
    expect(service).toBeTruthy();
  });
});
