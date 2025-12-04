import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dynamicClass',
  standalone: false,
})
export class DynamicClassPipe implements PipeTransform {

  transform(value: string): string {
    const badgePrefix = 'btn-';

    if(value === 'In Progress') {
      return  `${badgePrefix}warning`;
    } else if (value === 'Pending'){
      return  `${badgePrefix}secondary`;
    } else if (value === 'Done') {
      return  `${badgePrefix}success`;
    } else if (value === 'New') {
      return  `${badgePrefix}primary`;
    } else {
      return  `${badgePrefix}dark`;
    }
  }

}