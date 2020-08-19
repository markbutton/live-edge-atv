import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import * as state from '../../../shared/state';
import { SocketAPI } from 'src/app/shared/modules/socket.module';

import { MongodbConfigComponent } from './mongodb-config.component';

describe('MongodbConfigComponent', () => {
  let testHostComponent: TestHostComponent;
  let testHostFixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MongodbConfigComponent,
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
      db: 'testdb',
      collection: 'testcol'
    });
    testHostFixture.detectChanges();
    expect(testHostFixture.nativeElement.querySelector('input').value).toEqual(''); // TODO: fix this
  });

  it('should show different test config', () => {
    testHostComponent.setConfig({
      db: 'testdb2',
      collection: 'testcol2'
    });
    testHostFixture.detectChanges();
    expect(testHostFixture.nativeElement.querySelector('input').value).toEqual(''); // TODO: fix this
  });

  @Component({
    selector: 'app-host-component',
    template: '<app-mongodb-config [config]="config"></app-mongodb-config>'
  })
  class TestHostComponent {
    private config: object;

    setConfig(newConfig: object) {
      this.config = newConfig;
    }
  }

});
