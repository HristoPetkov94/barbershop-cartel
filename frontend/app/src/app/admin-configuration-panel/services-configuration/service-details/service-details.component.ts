import {Component, ElementRef, Input, OnInit, QueryList, ViewChildren} from '@angular/core';
import {Service} from '../../../interfaces/service';

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.css', '../../shared-styles/shared.css']
})
export class ServiceDetailsComponent implements OnInit {

  @ViewChildren('price') prices!: QueryList<ElementRef>;
  @ViewChildren('duration') durations!: QueryList<ElementRef>;

  @Input()
  public service: Service;

  public currency = 'лв.';

  constructor() {
  }

  ngOnInit(): void {
  }

  increment(inputType: string, id: number) {
    const identifier = inputType + id;

    let element;

    if (inputType === 'duration') {
      element = this.durations.find((elem) => identifier === elem.nativeElement.id);
    } else {
      element = this.prices.find((elem) => identifier === elem.nativeElement.id);
    }

    element.nativeElement.stepUp();
  }

  decrement(inputType: string, id: number) {
    const identifier = inputType + id;

    let element;

    if (inputType === 'duration') {
      element = this.durations.find((elem) => identifier === elem.nativeElement.id);
    } else {
      element = this.prices.find((elem) => identifier === elem.nativeElement.id);
    }

    element.nativeElement.stepDown();
  }

  delete(service: any) {
    service.deleted = true;
  }
}
