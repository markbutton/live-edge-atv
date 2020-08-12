import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stripDomain'
})
export class StripDomainPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    const darray = value.split('.');
    return darray[0];
  }

}
