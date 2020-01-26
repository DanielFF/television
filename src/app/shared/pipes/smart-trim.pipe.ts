import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'smartTrim' })
export class SmartTrimPipe implements PipeTransform {
  transform(value: string, targetLength: number): string {
    const space = ' ';
    let trimmedStr = value.substr(0, targetLength - space.length - 1);
    const lastDelimIndex = trimmedStr.lastIndexOf(space);

    if (lastDelimIndex >= 0) {
      trimmedStr = trimmedStr.substr(0, lastDelimIndex)
    };

    return trimmedStr ? `${trimmedStr}...` : '';
  }
}