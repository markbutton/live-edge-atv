import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import * as state from '../../../shared/state';
import { Zone } from '../../../shared/models/jobs/zone.model';
import { ValidateExists } from 'src/app/shared/validators/exists.validator';
import { InvalidWhitespaceValidator } from 'src/app/shared/validators/invalid-whitespace.validator';

@Component({
  selector: 'app-zone-edit',
  templateUrl: './zone-edit.component.html',
  styleUrls: ['./zone-edit.component.scss']
})
export class ZoneEditComponent implements OnInit, OnDestroy {
  zone_id: string;
  referenceID: string;
  zone: Observable<Zone>;
  zones: Array<any>;
  sub: any;
  querySub: any;
  zneForm: FormGroup;
  networkForm: FormGroup;
  zipForm: FormGroup;
  create = false;
  zoneTypes = ['State Wide', 'Master', 'Local', 'NotFound', 'Contractor'];

  constructor(private route: ActivatedRoute,
    private zoneState: state.ZoneState,
    private formBuilder: FormBuilder,
    private location: Location) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.zone_id = params['id'];
      if (!this.zone_id) {
        this.create = true;
      }
    });

    this.querySub = this.route.queryParams.subscribe(params => {
      this.referenceID = params['referenceID'];
    });

    this.zone = this.zoneState.zone;
    this.zones = this.zoneState.getZoneNames();
    this.zoneState.getZoneId(this.zone_id, this.referenceID);

    this.zneForm = this.formBuilder.group({
      zoneName: ['', [Validators.required, InvalidWhitespaceValidator(), ValidateExists(this.zones, this.create)]],
      syscode: [''],
      zoneType: ['']
    });

    this.networkForm = this.formBuilder.group({
      network: ['']
    });

    this.zipForm = this.formBuilder.group({
      zip: ['']
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onCancel() {
    this.location.back();
  }

  onSave() {
    const newZone = this.zneForm.getRawValue();
    this.zoneState.updateZone(newZone);
    this.location.back();
  }

  onAdd() {
    const newZone = this.zneForm.getRawValue();
    let latestZone = this.zoneState.getLatestZone();
    latestZone = Object.assign(latestZone, newZone);
    this.zoneState.createZone(latestZone);
    this.location.back();
  }

  addNetwork() {
    const newNetwork = this.networkForm.getRawValue();
    if (newNetwork.network !== '') {
      this.zoneState.addNetwork(newNetwork.network);
      this.networkForm.setValue({ network: '' });
    }
  }

  addZip() {
    const newZip = this.zipForm.getRawValue();
    if (newZip.zip !== '') {
      this.zoneState.addZip(newZip.zip);
      this.zipForm.setValue({ zip: '' });
    }
  }

  removeNetwork(network: string) {
    this.zoneState.removeNetwork(network);
  }

  removeZip(zip: string) {
    this.zoneState.removeZip(zip);
  }

}

