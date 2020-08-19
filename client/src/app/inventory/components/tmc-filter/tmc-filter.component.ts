import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { Equipment } from '../../../shared/models/equipment/equipment.model';
import { EquipmentState, JobsState } from '../../../shared/state';
import { JobManagement } from 'src/app/shared/models/jobs/job-management.model';
import { ConfirmModalComponent } from '../../../shared/components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-tmc-filter',
  templateUrl: './tmc-filter.component.html',
  styleUrls: ['./tmc-filter.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TmcFilterComponent implements OnInit {
  displayedColumns: string[] = [
    'actions', 'status', 'automationUnitCode', 'addressCode', 'addressTitle', 'city', 'state', 'zip', 'zones'
  ];
  lat: string;
  lon: string;
  sub: any;
  jobList: Array<JobManagement>;
  refTMC: Equipment;

  dataSource: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private route: ActivatedRoute,
    private equipmentState: EquipmentState,
    private jobState: JobsState,
    public dialog: MatDialog,
    private router: Router) { }

  ngOnInit(): void {
    this.sub = this.route.queryParams.subscribe(params => {
      this.lat = params.lat;
      this.lon = params.lon;
      this.equipmentState.searchEquipment({ lat: this.lat, lon: this.lon });
      combineLatest(
        [this.equipmentState.equipmentFilteredList,
        this.jobState.jobsManagementStatus]
      ).subscribe(
        ([equipments, jobs]) => {
          if (equipments.length > 0 && jobs.length > 0) {
            this.jobList = jobs;
            this.dataSource = new MatTableDataSource(equipments);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.refTMC = equipments[0];
          }
        }
      );
    });
  }

  checkMonitoredZone(automationUnitCode, zones): any {
    const jobs = this.jobList.filter(job => zones.filter(zone => zone.zone === job.zoneID).length > 0 && job.tmcID === automationUnitCode);
    if (jobs.length === 0) {
      return { monitoring: false };
    } else {
      const activeJobs = jobs.filter(job => (job.active === true));
      return { monitoring: true, active: activeJobs.length > 0 };
    }
  }

  getStatus(equipment: Equipment): string {
    const monitoring = this.checkMonitoredZone(equipment.automationUnitCode, equipment.zones);

    if (monitoring.monitoring) {
      if (monitoring.active) {
        return '<i title="Monitored on" class="fa fa-play-circle"></i>';
      } else {
        return '<i title="Monitored off" class="fa fa-pause-circle"></i>';
      }
    } else {
      if (equipment.zones.length > 0) {
        return '<i title="Not monitored" class="fa fa-check-circle"></i>';
      } else {
        return '<i title="No zone configured" class="fa fa-question-circle"></i>';
      }
    }
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

  deleteItem(id: string): void {
    this.equipmentState.deleteEquipment(id);
    if (this.dataSource.filteredData.length < 2) {
      this.router.navigateByUrl('/zones');
    }
  }

  onBack(): void {
    this.router.navigateByUrl('/zones');
  }
}
