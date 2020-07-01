import { Pipe, PipeTransform } from "@angular/core";
import { DecimalPipe } from "@angular/common";

@Pipe({
  name: "customCurrencyPipe",
})
export class CustomCurrencyPipe extends DecimalPipe implements PipeTransform {
  // tslint:disable-next-line:ban-types
  transform(value: any, format: string, currency: string): any {
    return super.transform(value, format).concat(currency);
  }
}
