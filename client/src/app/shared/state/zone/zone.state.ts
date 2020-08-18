import { Injectable, ComponentFactoryResolver } from '@angular/core';
import { BehaviorSubject, Observable, observable } from 'rxjs';

import { Zone } from '../../models/jobs/zone.model';
import { ZonePoly } from '../../models/equipment/zone-poly.model';
import { ZoneService } from '../../services/zone/zone.service';
import { ZonePolyService } from '../../services/zone/zone-poly.service';

@Injectable()
export class ZoneState {
  // State Model
  private _zones: BehaviorSubject<Array<Zone>> = new BehaviorSubject(Array());
  public zones: Observable<Array<Zone>> = this._zones.asObservable();
  private _zone: BehaviorSubject<Zone> = new BehaviorSubject(Object());
  public zone: Observable<Zone> = this._zone.asObservable();
  private _zonePolys: BehaviorSubject<Array<ZonePoly>> = new BehaviorSubject(Array());
  public zonePolys: Observable<Array<ZonePoly>> = this._zonePolys.asObservable();
  private _zonePoly: BehaviorSubject<ZonePoly> = new BehaviorSubject(Object());
  public zonePoly: Observable<ZonePoly> = this._zonePoly.asObservable();
  private _selectedZones: BehaviorSubject<Array<Zone>> = new BehaviorSubject(Array());
  public selectedZones: Observable<Array<Zone>> = this._selectedZones.asObservable();

  constructor(private zoneService: ZoneService,
    private zonePolyService: ZonePolyService) {
    this.getZoneService();
    this.getZonePolyService();
  }

  // State Controller
  getZoneService(): void {
    this.zoneService.getZone().subscribe(
      res => {
        const response = res;
        this._zones.next(response);
      },
      err => {
        console.error('Error retrieving zones', err);
      }
    );
  }

  getZonePolyService(): void {
    this.zonePolyService.getZonePoly().subscribe(
      res => {
        const response = res;
        this._zonePolys.next(response);
      },
      err => {
        console.error('Error retreiving zone polys', err);
      }
    );
  }

  refreshZonePolyService(): void {
    this.zonePolyService.refreshZonePoly().subscribe(
      res => {
        this.getZoneService();
        this.getZonePolyService();
      },
      err => {
        console.error('Error refreshing zone polys', err);
      }
    );
  }

  getLatestZones(): Array<Zone> {
    const latest = this._zones.getValue();
    return latest;
  }

  getLatestZonePolys(): Array<ZonePoly> {
    const latest = this._zonePolys.getValue();
    return latest;
  }

  getLatestZone(): any {
    const latest = this._zone.getValue();
    return latest;
  }

  getLatestZonePoly(): any {
    const latest = this._zonePoly.getValue();
    return latest;
  }

  getSelectedZones(): Array<Zone> {
    const latest = this._selectedZones.getValue();
    return latest;
  }

  setSelectedZones(znlist: Array<any>): void {
    const zns = this.getLatestZones();
    const selected = new Array();
    zns.forEach(element => {
      const zn = element.zoneName;
      if (znlist.includes(zn)) {
        selected.push(element);
      }
    });
    this._selectedZones.next(selected);
  }

  getZoneId(id: string, referenceID?: string): void {
    if (!id) {
      if (referenceID) {
        this.zoneService.getZoneId(referenceID).subscribe(
          (res: Zone) => {
            const newZone = res;
            this._zone.next(newZone);
          },
          err => {
            console.error('Error retrieving equipment', err);
          }
        );
      } else {
        const newZone = new Zone();
        this._zone.next(newZone);
      }
    } else {
      this.zoneService.getZoneId(id).subscribe(
        res => {
          const response = res;
          this._zone.next(response);
        },
        err => {
          console.error('Error retrieving zone', err);
        }
      );
    }
  }

  createZone(newZone: any): void {
    this.zoneService.createZone(newZone).subscribe(
      res => {
        // tmc was created in db. now update the equipment state
        const latestZones: Array<Zone> = this.getLatestZones();
        latestZones.push(res);
        this._zones.next(latestZones);
      },
      err => {
        console.error('Error inserting equipment', err);
      }
    );
  }

  updateZone(nt: any): void {
    let latestZone = this.getLatestZone();
    latestZone = Object.assign(latestZone, nt);
    this.zoneService.updateZone(latestZone).subscribe(
      res => {
        // tmc was updated in db. now update the equipment state
        const latestZones: Array<Zone> = this.getLatestZones();
        const index = latestZones.findIndex((le) => le._id === latestZone._id);
        latestZones[index] = latestZone;

        const selectedZones: Array<Zone> = this.getSelectedZones();
        const selectedZoneIndex = selectedZones.findIndex((le) => le._id === latestZone._id);
        selectedZones[selectedZoneIndex] = latestZone;
        this._selectedZones.next(selectedZones);
        this._zones.next(latestZones);
      },
      err => {
        console.error('Error updating zone', err);
      }
    );
  }

  deleteZone(id: string): void {
    this.zoneService.deleteZone(id).subscribe(
      res => {
        const latestZones: Array<Zone> = this.getLatestZones();
        const index = latestZones.findIndex((zone) => zone._id === res._id);
        latestZones.splice(index, 1);
        this._zones.next(latestZones);
      },
      err => {
        console.error('Error deleting equipment', err);
      }
    );
  }

  getZoneNames(): Array<any> {
    const latest = this._zones.getValue();
    const zl = new Array();
    latest.forEach(element => {
      zl.push(element.zoneName);
    });
    return zl;
  }

  addNetwork(nw: string): void {
    const lz = this.getLatestZone();
    lz.networks.push(nw);
    this._zone.next(lz);
  }

  addZip(zip: string): void {
    let lz = this.getLatestZone();
    if (!lz.zips) {
      const tz = new Zone();
      lz = Object.assign(tz, lz);
    }
    lz.zips.push(zip);
    this._zone.next(lz);
  }

  removeNetwork(nw: string): void {
    const lz = this.getLatestZone();
    const networks = lz.networks;
    const index: number = networks.findIndex(network => network === nw);
    if (index !== -1) {
      lz.networks.splice(index, 1);
      this._zone.next(lz);
    }
  }

  removeZip(zip: string): void {
    const lz = this.getLatestZone();
    const zips = lz.zips;
    const index: number = zips.findIndex(zp => zp === zip);
    if (index !== -1) {
      lz.zips.splice(index, 1);
      this._zone.next(lz);
    }
  }

}
