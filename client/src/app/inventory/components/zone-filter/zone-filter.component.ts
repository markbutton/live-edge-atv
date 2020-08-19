import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { ZoneState } from '../../../shared/state';
import { ConfirmModalComponent } from '../../../shared/components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-zone-filter',
  templateUrl: './zone-filter.component.html',
  styleUrls: ['./zone-filter.component.scss']
})
export class ZoneFilterComponent implements OnInit {
  displayedColumns: string[] = [
    'actions', 'zoneName', 'syscode', 'zoneType', 'networks', 'zips'
  ];
  zones: Array<any>;
  sub: any;
  dataSource: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private route: ActivatedRoute,
    private zoneState: ZoneState,
    public dialog: MatDialog,
    private router: Router) { }

  ngOnInit(): void {
    this.zoneState.selectedZones.subscribe(
      () => {
        this.zones = this.zoneState.getSelectedZones();
        console.log(this.zones);
        this.dataSource = new MatTableDataSource(this.zones);
      }
    );
  }

  deleteItem(id: string): void {
    this.zoneState.deleteZone(id);
  }

  openDeleteModal(id: string): void {
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

  onBack(): void {
    this.router.navigateByUrl('/map');
  }

}
