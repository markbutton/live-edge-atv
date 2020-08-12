import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { EquipmentService } from './equipment.service';

describe('EquipmentService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule
    ]
  }));

  it('should be created', () => {
    const service: EquipmentService = TestBed.get(EquipmentService);
    expect(service).toBeTruthy();
  });
});
