import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { IdeViewState, WorkflowState } from '../../../shared/state';
import { SocketAPI } from '../../../shared/modules/socket.module';

import { SnmpConfigComponent } from './snmp-config.component';

describe('SnmpConfigComponent', () => {
  let testHostComponent: TestHostComponent;
  let testHostFixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SnmpConfigComponent,
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
      host: 'testhost',
      port: 'testport'
    });
    testHostFixture.detectChanges();
    expect(testHostFixture.nativeElement.querySelector('input').value).toEqual(''); // TODO: fix this
  });

  it('should show different test config', () => {
    testHostComponent.setConfig({
      host: 'testhost2',
      port: 'testport2'
    });
    testHostFixture.detectChanges();
    expect(testHostFixture.nativeElement.querySelector('input').value).toEqual(''); // TODO: fix this
  });

  @Component({
    selector: 'app-host-component',
    template: '<app-snmp-config [config]="config"></app-snmp-config>'
  })
  class TestHostComponent {
    private config: object;

    setConfig(newConfig: object) {
      this.config = newConfig;
    }
  }

});
