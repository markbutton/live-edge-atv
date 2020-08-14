import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import * as state from '../../../shared/state';
import { Equipment } from '../../../shared/models/equipment/equipment.model';
import { ConfirmModalComponent } from '../../../shared/components/confirm-modal/confirm-modal.component';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { EquipmentView } from '../../../shared/models/equipment/equipment-view.model';
import { JobManagement } from '../../../shared/models/jobs/job-management.model';
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-tmc',
  templateUrl: './tmc.component.html',
  styleUrls: ['./tmc.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TmcComponent implements OnInit {
  displayedColumns: string[] = [
    'actions', 'status', 'automationUnitCode', 'addressCode', 'addressTitle', 'city', 'state', 'zip', 'zones'
  ];
  equipmentList: Array<Equipment>;
  jobList: Array<JobManagement>;
  dataSource: any;
  pageSize: number;
  page: number;
  defaultSortSet = false;
  equipmentUpdating: boolean;

  // View State
  equipmentView$: Subscription;
  equipmentView: EquipmentView;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private equipmentState: state.EquipmentState, private jobState: state.JobsState,
    private equipmentViewState: state.EquipmentViewState,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.equipmentView$ = this.equipmentViewState.equipmentView.subscribe((equipmentView) => {
      if (equipmentView) {
        console.log(equipmentView);
        this.equipmentView = equipmentView;
        const sortable = this.equipmentView.sort;
        if (!this.defaultSortSet && sortable && sortable.direction !== '') {
          this.setSort(sortable.active, sortable.direction === 'asc' ? 'asc' : 'desc');
        }
        this.defaultSortSet = true;
      }
    });
    combineLatest(
      [this.equipmentState.equipmentFilteredList,
      this.jobState.jobsManagementStatus,
      this.equipmentState.equipmentUpdating]
    ).subscribe(
      ([equipments, jobs]) => {
        this.checkEquipment();
      }
    );
  }

  checkEquipment(): void {
    this.jobList = this.jobState.getJobManagement();
    this.equipmentUpdating = this.equipmentState.getEquipmentUpdating();
    this.equipmentState.equipmentList.subscribe(equipments => {
      this.equipmentList = this.equipmentState.getLatestEquipment();
      if (this.equipmentList.length > 0 && !this.equipmentUpdating) {
        const eqs = this.parsingEquipmentData();
        this.dataSource = new MatTableDataSource(eqs);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(this.dataSource);
      }
    });
  }

  checkMonitoredZone(automationUnitCode, zones): any {
    const jobs = this.jobList.filter(job => zones.includes(job.zoneID) && job.tmcID.toLowerCase() === automationUnitCode.toLowerCase());
    if (jobs.length === 0) {
      return { monitoring: false };
    } else {
      const activeJobs = jobs.filter(job => (job.active === true));
      return { monitoring: true, active: activeJobs.length > 0 };
    }
  }

  getStatus(equipment): string {
    const zones = equipment.zones.split(', ');
    const monitoring = this.checkMonitoredZone(equipment.automationUnitCode, zones);

    if (monitoring.monitoring) {
      if (monitoring.active) {
        return '<i class="fa fa-play-circle"></i>';
      } else {
        return '<i class="fa fa-pause-circle"></i>';
      }
    } else {
      if (equipment.zones.length > 0) {
        return '<i class="fa fa-check-circle"></i>';
      } else {
        return '<i class="fa fa-question-circle"></i>';
      }
    }
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteItem(id: string): void {
    this.equipmentState.deleteEquipment(id);
  }

  openDeleteModal(id: string): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: 1,
      title: 'Delete TMC',
      content: 'Are you sure you want to delete this TMC?'
    };

    const dialogRef = this.dialog.open(ConfirmModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteItem(id);
      }
    });
  }

  onPaginateChange(event): void {
    this.equipmentView.page = event.pageIndex;
    this.equipmentView.pageSize = event.pageSize;
    this.equipmentViewState.setEquipmentViewState(this.equipmentView);
  }

  parsingEquipmentData(): any[] {
    const equipments = [];
    for (const eq of this.equipmentList) {
      equipments.push({
        _id: eq._id,
        automationUnitCode: eq.automationUnitCode,
        addressCode: eq.addressCode,
        addressTitle: eq.addressTitle,
        description: eq.description,
        city: eq.city,
        state: eq.state,
        zones: eq.zones.map((zone) => zone.zone).join(', '),
        zip: eq.zip,
        lat: eq.lat,
        lon: eq.lon,
      });
    }
    return equipments;
  }

  setSort(id: string, start?: 'asc' | 'desc'): void {
    start = start || 'asc';
    const disableClear = false;
    // Reset state so that start is the first sort direction that you will see
    // this.sort.sort({ id: null, start, disableClear });
    this.sort.sort({ id, start, disableClear });
  }
}
