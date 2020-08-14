import { Geometry } from './geomety.model';
import { Properties } from './properties.model';

export class ZonePoly {
  _id: object;
  type: string;
  properties: Properties;
  geometry: Geometry;

  constructor() {
    this._id = null;
    this.type = '';
    this.properties = new Properties();
    this.geometry = new Geometry();
  }
}
