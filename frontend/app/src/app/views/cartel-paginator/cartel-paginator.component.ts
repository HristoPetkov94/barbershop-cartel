import {
  AfterContentInit,
  Component,
  ContentChildren,
  Input,
  OnInit,
  QueryList,
} from '@angular/core';
import {CartelPageItemDirective} from './cartel-page-item.directive';
import {animate, style, transition, trigger} from '@angular/animations';

export interface Page {

  active: boolean;
  content: CartelPageItemDirective[];
}

// Followed this example https://stackblitz.com/edit/angular-carousel-component?file=app%2Fcarousel.component.ts
@Component({
  selector: 'app-cartel-paginator',
  templateUrl: './cartel-paginator.component.html',
  styleUrls: ['./cartel-paginator.component.css'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({transform: 'translateX(+100%)', opacity: '0'}),
        animate('300ms ease-in', style({
          transform: 'translateX(0%)', opacity: '1',
          transition: '2s'
        }))
      ]),
    ]),
  ],
})
export class CartelPaginatorComponent implements OnInit, AfterContentInit {
  @ContentChildren(CartelPageItemDirective) items: QueryList<CartelPageItemDirective>;

  public page = 0;
  public pages: Page[] = [];


  @Input()
  public itemsPerPage;

  constructor() {
  }

  ngOnInit(): void {

  }

  private spreadDataIntoPages() {
    if (this.items.length === 0) {
      return;
    }

    let page: Page = {content: [], active: false};

    let i = 1;

    this.items.forEach(item => {
      if (page.content.length === this.itemsPerPage) {
        this.pages.push(page);
        const content: CartelPageItemDirective[] = [];
        page = {content, active: false};
      }

      page.content.push(item);

      if (i === this.items.length) {
        this.pages.push(page);
      }

      i++;
    });

    this.pages[this.page].active = true;
  }

  switchPage(index) {
    if (this.pages[index] === undefined) {
      return;
    }

    for (const page of this.pages) {
      page.active = false;
    }

    this.pages[index].active = true;

    this.page = index;
  }

  ngAfterContentInit(): void {
    this.items.changes.subscribe(() => {
      this.spreadDataIntoPages();
    });
  }
}
