import { Link } from './link.model';
export class NavView {
  subnav: boolean;
  title: string;
  links: Array<Link>;

  constructor() {
    this.subnav = false;
    this.title = '';
    this.links = [];
  }
}
