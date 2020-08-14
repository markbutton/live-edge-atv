import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { WorkflowService } from './workflow.service';
import { SocketAPI } from '../../modules/socket.module';

describe('WorkflowService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule
    ],
    providers: [
      SocketAPI
    ]
  }));

  it('should be created', () => {
    const service: WorkflowService = TestBed.get(WorkflowService);
    expect(service).toBeTruthy();
  });
});
