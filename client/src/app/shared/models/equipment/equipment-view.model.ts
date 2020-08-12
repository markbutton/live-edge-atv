import { MatSort } from '@angular/material/sort';

export class EquipmentView {
  page: number;
  pageSize: number;
  length: number;
  keywords: string;
  sort: any;

  constructor() {
    this.page = 0;
    this.pageSize = 10;
    this.length = 0;
    this.keywords = '';
    this.sort = null;
  }
}
