export class MapView {
  latitude: number;
  longitude: number;
  zoom: number;
  isMasterPoly: boolean;
  isLocalPoly: boolean;
  isStatePoly: boolean;
  selectedValue: string;
  selectedItem: number;

  constructor() {
    this.latitude = 4346124.387119868;
    this.longitude = -10492975.202173969;
    this.zoom = 4.5;
    this.isMasterPoly = false;
    this.isLocalPoly = false;
    this.isStatePoly = false;
    this.selectedValue = '';
    this.selectedItem = 0;
  }
}
