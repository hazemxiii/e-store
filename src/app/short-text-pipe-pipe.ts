import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortTextPipe',
})
export class ShortTextPipePipe implements PipeTransform {
  transform(value: string, expand: boolean): string {
    if (expand) {
      return value;
    }
    if (value.split(' ').length > 3) {
      return value.split(' ').slice(0, 3).join(' ') + '...';
    }
    return value;
  }
}
