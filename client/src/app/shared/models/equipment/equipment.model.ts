import { Zone } from './zone.model';

export class Equipment {
  _id: string;
  automationUnitCode: string;
  addressCode: string;
  addressTitle: string;
  description: string;
  city: string;
  state: string;
  zones: Zone[];
  zip: string;
  lat: string;
  lon: string;

  constructor(equipment?: Equipment) {
    this.automationUnitCode = '';
    this.addressCode = equipment ? equipment.addressCode : '';
    this.addressTitle = equipment ? equipment.addressTitle : '';
    this.description = '';
    this.city = equipment ? equipment.city : '';
    this.state = equipment ? equipment.state : '';
    this.zones = [];
    this.zip = equipment ? equipment.zip : '';
    this.lat = equipment ? equipment.lat : '';
    this.lon = equipment ? equipment.lon : '';
  }
}
