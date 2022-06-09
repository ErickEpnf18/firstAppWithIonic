import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gps'
})
export class GpsPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
