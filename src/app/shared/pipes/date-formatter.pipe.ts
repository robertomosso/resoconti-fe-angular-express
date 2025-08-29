import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormatter'
})
export class DateFormatterPipe implements PipeTransform {

  // TODO prevedere fallback in caso di errori?
  transform(value: string): string {
    const date = value.split('-');
    const formattedDate = `${date[2]}/${date[1]}/${date[0]}`;
    return formattedDate;
  }

}
