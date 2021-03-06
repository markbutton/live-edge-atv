import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, observable } from 'rxjs';

import { Equipment } from '../../models/equipment/equipment.model';
import { EquipmentService } from '../../services/equipment/equipment.service';

@Injectable()
export class EquipmentState {
  // State Model
  private _equipment: BehaviorSubject<Array<Equipment>> = new BehaviorSubject(Array());
  public equipment: Observable<Array<Equipment>> = this._equipment.asObservable();
  private _tmc: BehaviorSubject<Equipment> = new BehaviorSubject(Object());
  public tmc: Observable<Equipment> = this._tmc.asObservable();
  private _equipmentList: BehaviorSubject<Array<any>> = new BehaviorSubject(Array());
  public equipmentList: Observable<Array<any>> = this._equipmentList.asObservable();
  private _zoneList: BehaviorSubject<Array<any>> = new BehaviorSubject(Array());
  public zoneList: Observable<Array<any>> = this._zoneList.asObservable();

  private _page: BehaviorSubject<number> = new BehaviorSubject(Number());
  public page: Observable<number> = this._page.asObservable();

  private _pageSize: BehaviorSubject<number> = new BehaviorSubject(Number());
  public pageSize: Observable<number> = this._pageSize.asObservable();

  private _equipmentUpdating: BehaviorSubject<boolean> = new BehaviorSubject(Boolean());
  public equipmentUpdating: Observable<boolean> = this._equipmentUpdating.asObservable();

  private _equipmentFilteredList: BehaviorSubject<Array<any>> = new BehaviorSubject(Array());
  public equipmentFilteredList: Observable<Array<any>> = this._equipmentFilteredList.asObservable();


  constructor(private equipmentService: EquipmentService) {
    this.setPage(0);
    this.setPageSize(10);
    this.setEquipmentUpdating(false);
    this.getEquipmentService();
  }

  // State Controller
  getEquipmentService(): void {
    this.equipmentService.getEquipment().subscribe(
      res => {
        const response = res;
        this._equipment.next(response);
        this.createLists();
      },
      err => {
        console.error('Error retrieving equipment', err);
      }
    );
  }

  createLists(): void {
    const distinct = (value, index, self) => {
      return self.indexOf(value) === index;
    };
    const ec = this.getLatestEquipment();
    const el = new Array();
    const zl = new Array();
    ec.forEach(element => {
      el.push(element.automationUnitCode);
      zl.push(element.zones);
    });
    const del = el.filter(distinct);
    this._equipmentList.next(del);
    const zel = zl.filter(distinct);
    this._zoneList.next(zel);
  }

  getLatestEquipment(): Array<Equipment> {
    const latestEquipment = this._equipment.getValue();
    return latestEquipment;
  }

  getLatestEquipmentList(): Array<any> {
    const latestEquipmentList = this._equipmentList.getValue();
    return latestEquipmentList;
  }

  getLatestEquipmentFiltered(): Array<Equipment> {
    const lefl = this._equipmentFilteredList.getValue();
    return lefl;
  }

  getLatestTmc(): Equipment {
    const latestTmc = this._tmc.getValue();
    return latestTmc;
  }

  setTmc(tmc: Equipment): void {
    this._tmc.next(tmc);
  }

  getEquipmentId(id: string, referenceID?: string): void {
    if (!id) {
      if (referenceID) {
        this.equipmentService.getEquipmentId(referenceID).subscribe(
          (res: Equipment) => {
            const newTmc = new Equipment(res);
            this._tmc.next(newTmc);
          },
          err => {
            console.error('Error retrieving equipment', err);
          }
        );
      } else {
        const newTmc = new Equipment();
        this._tmc.next(newTmc);
      }
    } else {
      this.equipmentService.getEquipmentId(id).subscribe(
        res => {
          const response = res;
          this._tmc.next(response);

        },
        err => {
          console.error('Error retrieving equipment', err);
        }
      );
    }
  }

  updateEquipment(nt: any): void {
    this.setEquipmentUpdating(true);
    let latestTmc = this.getLatestTmc();
    latestTmc = Object.assign(latestTmc, nt);
    this.equipmentService.updateEquipment(latestTmc).subscribe(
      res => {
        // tmc was updated in db. now update the equipment state
        const latestEquipment: Array<Equipment> = this.getLatestEquipment();
        const index = latestEquipment.findIndex((le) => le._id === latestTmc._id);
        latestEquipment[index] = latestTmc;
        this._equipment.next(latestEquipment);
        this.setEquipmentUpdating(false);
      },
      err => {
        console.error('Error updating equipment', err);
      }
    );
  }

  createEquipment(newTmc: any): void {
    // const newTmc = this.getLatestTmc();
    this.setEquipmentUpdating(true);
    this.equipmentService.createEquipment(newTmc).subscribe(
      res => {
        // tmc was created in db. now update the equipment state
        const latestEquipment: Array<Equipment> = this.getLatestEquipment();
        latestEquipment.push(res);
        this._equipment.next(latestEquipment);
        this.setEquipmentUpdating(false);
      },
      err => {
        console.error('Error inserting equipment', err);
      }
    );
  }

  deleteEquipment(id: string): void {
    this.equipmentService.deleteEquipment(id).subscribe(
      res => {
        const latestEquipment: Array<Equipment> = this.getLatestEquipment();
        const index = latestEquipment.findIndex((tmc) => tmc._id === res._id);
        latestEquipment.splice(index, 1);
        this._equipment.next(latestEquipment);

        const latestEquipmentList: Array<Equipment> = this.getLatestEquipmentList();
        const indexOfList = latestEquipmentList.findIndex((tmc) => tmc._id === res._id);
        latestEquipmentList.splice(indexOfList, 1);
        this._equipmentList.next(latestEquipmentList);

        const latestEquipmentFiltered: Array<Equipment> = this.getLatestEquipmentFiltered();
        const indexOfFiltered = latestEquipmentFiltered.findIndex((tmc) => tmc._id === res._id);
        latestEquipmentFiltered.splice(indexOfFiltered, 1);
        this._equipmentFilteredList.next(latestEquipmentFiltered);
      },
      err => {
        console.error('Error deleting equipment', err);
      }
    );
  }

  searchEquipment(data: any): void {
    this.equipmentService.searchEquipment(data).subscribe(
      res => {
        this._equipmentFilteredList.next(res);
      },
      err => {
        console.error('Error retrieving equipment', err);
      }
    );
  }

  setPage(page: number): void {
    this._page.next(page);
  }

  setPageSize(pageSize: number): void {
    this._pageSize.next(pageSize);
  }

  // equipment updating
  setEquipmentUpdating(updating: boolean): void {
    this._equipmentUpdating.next(updating);
  }

  getEquipmentUpdating(): boolean {
    return this._equipmentUpdating.getValue();
  }

  addZone(nz: any): void {
    const ntmc = this.getLatestTmc();
    ntmc.zones.push(nz);
    this._tmc.next(ntmc);
  }

  removeZone(oz: any): void {
    const ntmc = this.getLatestTmc();
    const zones = ntmc.zones;
    const index: number = zones.findIndex(zone => zone.zone === oz);
    if (index !== -1) {
      ntmc.zones.splice(index, 1);
      this._tmc.next(ntmc);
    }
  }

  checkExitEqByTMC(tmcID: string, eqID: string): boolean {
    const equipments = this._equipment.getValue();

    const existEq = equipments.find(eq => {
      return eq.automationUnitCode.toLowerCase() === tmcID.toLowerCase() && eq._id !== eqID;
    });

    if (existEq) {
      return true;
    }

    return false;
  }
}
