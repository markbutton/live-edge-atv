import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { EquipmentState } from '../../../shared/state';
import { Equipment } from '../../../shared/models/equipment/equipment.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tmc-edit',
  templateUrl: './tmc-edit.component.html',
  styleUrls: ['./tmc-edit.component.scss']
})
export class TmcEditComponent implements OnInit, OnDestroy {
  tmc_id: string;
  referenceID: string;
  tmc: Observable<Equipment>;
  sub: any;
  querySub: any;
  tmcForm: FormGroup;
  zoneForm: FormGroup;
  create = false;

  constructor(private route: ActivatedRoute,
    private equipmentState: EquipmentState,
    private formBuilder: FormBuilder,
    private location: Location,
    private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.tmc_id = params.id;
      if (!this.tmc_id) {
        this.create = true;
      }
    });

    this.querySub = this.route.queryParams.subscribe(params => {
      this.referenceID = params.referenceID;
    });

    this.tmc = this.equipmentState.tmc;
    this.equipmentState.getEquipmentId(this.tmc_id, this.referenceID);

    this.tmcForm = this.formBuilder.group({
      automationUnitCode: ['', Validators.required],
      addressCode: ['', Validators.required],
      addressTitle: ['', Validators.required],
      description: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
      lat: ['', Validators.required],
      lon: ['', Validators.required]
    });

    this.zoneForm = this.formBuilder.group({
      zone: ['']
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onCancel(): void {
    this.location.back();
  }

  onSave(): void {
    const newTmc = this.tmcForm.getRawValue();
    let latestTmc = this.equipmentState.getLatestTmc();
    latestTmc = Object.assign(latestTmc, newTmc);
    if (this.equipmentState.checkExitEqByTMC(latestTmc.automationUnitCode, latestTmc._id)) {
      this.equipmentState.updateEquipment(newTmc);
      this.location.back();
    } else {
      this.toastr.warning('The tmc ID is not existed!', 'Warning');
    }
  }

  onAdd(): void {
    const newTmc = this.tmcForm.getRawValue();
    let latestTmc = this.equipmentState.getLatestTmc();
    latestTmc = Object.assign(latestTmc, newTmc);
    if (!this.equipmentState.checkExitEqByTMC(latestTmc.automationUnitCode, latestTmc._id)) {
      this.equipmentState.createEquipment(latestTmc);
      this.location.back();
    } else {
      this.toastr.warning('The tmc ID is existed!', 'Warning');
    }
  }

  addZone(): void {
    const newZone = this.zoneForm.getRawValue();
    if (newZone.zone !== '') {
      this.equipmentState.addZone(newZone);
      this.zoneForm.setValue({ zone: '' });
    }
  }

  removeZone(zone): void {
    this.equipmentState.removeZone(zone);
  }

}
