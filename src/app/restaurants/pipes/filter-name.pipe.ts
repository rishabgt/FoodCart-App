import { Restaurants } from './../../models/restaurants';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterName',
})
export class FilterNamePipe implements PipeTransform {
  transform(value: Restaurants[], query: String): Restaurants[] {
    if (query === '') {
      return value;
    } else {
      return value.filter((item: Restaurants) => {
        return item.name.toLowerCase().search(query.toLowerCase()) >= 0;
      });
    }
  }
}
