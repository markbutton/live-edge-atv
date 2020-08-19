import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { ApiConfigComponent } from './api-config.component';
import * as state from 'src/app/shared/state';
import { SocketAPI } from 'src/app/shared/modules/socket.module';

describe('ApiConfigComponent', () => {
  let testHostComponent: TestHostComponent;
  let testHostFixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ApiConfigComponent,
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
        state.IdeViewState,
        state.WorkflowState,
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
      path: 'testpath'
    });
    testHostFixture.detectChanges();
    expect(testHostFixture.nativeElement.querySelector('input').value).toEqual(''); // TODO: fix this
  });

  it('should show different test config', () => {
    testHostComponent.setConfig({
      host: 'testhost2',
      path: 'testpath2'
    });
    testHostFixture.detectChanges();
    expect(testHostFixture.nativeElement.querySelector('input').value).toEqual(''); // TODO: fix this
  });

  @Component({
    selector: 'app-host-component',
    template: '<app-api-config [config]="config"></app-api-config>'
  })
  class TestHostComponent {
    private config: object;

    setConfig(newConfig: object) {
      this.config = newConfig;
    }
  }

});
