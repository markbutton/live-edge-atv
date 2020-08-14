import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { SplunkConfigComponent } from './splunk-config.component';
import { IdeViewState, WorkflowState } from '../../../shared/state';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { SocketAPI } from 'src/app/shared/modules/socket.module';

describe('SplunkConfigComponent', () => {
  let testHostComponent: TestHostComponent;
  let testHostFixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SplunkConfigComponent,
        // tslint:disable-next-line: no-use-before-declare
        TestHostComponent
      ],
      imports: [
        HttpClientModule,
        FormsModule,
        MatDialogModule
      ],
      providers: [
        SocketAPI,
        IdeViewState,
        WorkflowState,
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    // tslint:disable-next-line: no-use-before-declare
    testHostFixture = TestBed.createComponent(TestHostComponent);
    testHostComponent = testHostFixture.componentInstance;
  });

  it('should create', () => {
    expect(testHostComponent).toBeTruthy();
  });

  it('should show test config', () => {
    testHostComponent.setConfig({
      file: 'test',
      location: 'test'
    });
    testHostFixture.detectChanges();
    expect(testHostFixture.nativeElement.querySelector('input').value).toEqual(''); // TODO: fix this
  });

  it('should show different test config', () => {
    testHostComponent.setConfig({
      file: 'test2',
      location: 'test2'
    });
    testHostFixture.detectChanges();
    expect(testHostFixture.nativeElement.querySelector('input').value).toEqual(''); // TODO: fix this
  });

  @Component({
    selector: 'app-host-component',
    template: '<app-splunk-config [config]="config"></app-splunk-config>'
  })
  class TestHostComponent {
    private config: object;

    setConfig(newConfig: object) {
      this.config = newConfig;
    }
  }

});
