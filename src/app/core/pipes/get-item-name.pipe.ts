import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'getItemName'
})
export class GetItemNamePipe implements PipeTransform {

  transform(value: any, list: any[], undefindName: string, entityName: any): unknown {
    if (list == undefined || list.length == 0 || value == undefined)
      return;

    let name = '';
    name = list.find(a => a[undefindName] == parseInt(value));

    if (name == undefined)
      return;

    return name[entityName];
  }

}
