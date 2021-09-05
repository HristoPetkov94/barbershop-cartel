import {Directive, TemplateRef} from '@angular/core';

@Directive({
  selector: '[appCartelPageItem]'
})
export class CartelPageItemDirective {

  constructor(public tpl: TemplateRef<any>) {
  }
}
