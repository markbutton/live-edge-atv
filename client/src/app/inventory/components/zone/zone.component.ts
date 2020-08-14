import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import * as state from '../../../shared/state';
import { ConfirmModalComponent } from '../../../shared/components/confirm-modal/confirm-modal.component';
import { Zone } from 'src/app/shared/models/jobs/zone.model';
import { ZoneView } from 'src/app/shared/models/equipment/zone-view.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-zone',
  templateUrl: './zone.component.html',
  styleUrls: ['./zone.component.scss']
})
export class ZoneComponent implements OnInit {
  displayedColumns: string[] = [
    'actions', 'zoneName', 'syscode', 'zoneType', 'networks', 'zips'
  ];
  zones: Array<Zone>;
  dataSource: any;
  defaultSortSet = false;
  loading = true;

  // View State
  zoneView$: Subscription;
  zoneView: ZoneView;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private zoneState: state.ZoneState, private zoneViewState: state.ZoneViewState,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.zoneView$ = this.zoneViewState.zoneView.subscribe((zoneView) => {
      if (zoneView) {
        this.zoneView = zoneView;
        const sortable = this.zoneView.sort;
        if (!this.defaultSortSet && sortable && sortable.direction !== '') {
          this.setSort(sortable.active, sortable.direction === 'asc' ? 'asc' : 'desc');
        }
        this.defaultSortSet = true;
      }
    });
    this.zoneState.zones.subscribe(
      () => {
        this.checkZone();
      }
    );
  }

  checkZone() {
    this.zones = this.zoneState.getLatestZones();
    if (this.zones.length > 0) {
      this.dataSource = new MatTableDataSource(this.zones);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loading = false;
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteItem(id: string) {
    this.zoneState.deleteZone(id);
  }

  openDeleteModal(id: string) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: 1,
      title: 'Delete Zone',
      content: 'Are you sure you want to delete this Zone'
    };

    const dialogRef = this.dialog.open(ConfirmModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteItem(id);
      }
    });
  }

  onPaginateChange(event) {
    this.zoneView.page = event.pageIndex;
    this.zoneView.pageSize = event.pageSize;
    this.zoneViewState.setZoneViewState(this.zoneView);
  }

  setSort(id: string, start?: 'asc' | 'desc') {
    start = start || 'asc';
    const toState = 'active';
    const disableClear = false;
    // Reset state so that start is the first sort direction that you will see
    // this.sort.sort({ id: null, start, disableClear });
    this.sort.sort({ id, start, disableClear });
  }

  refreshZonePoly() {
    this.loading = true;
    this.zoneState.refreshZonePolyService();
  }

}

