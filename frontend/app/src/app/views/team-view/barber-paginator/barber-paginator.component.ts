import {Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {Page} from './page';
import {animate, style, transition, trigger} from '@angular/animations';
import {Barber} from '../../../models/barber.model';
import {Router} from '@angular/router';
import {getCookie} from '../../../utils/cookie.utils';

@Component({
  selector: 'app-barber-paginator',
  templateUrl: './barber-paginator.component.html',
  styleUrls: ['./barber-paginator.component.css'],
  animations:
    [
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
export class BarberPaginatorComponent implements OnInit, OnChanges {

  @ViewChild('paginator', {static: true}) paginator: ElementRef;

  public page = 0;
  public pages: Page[] = [];
  public language: string;

  @Input()
  get data(): Barber[] {
    return this.barbers;
  }

  set data(barbers: Barber[]) {
    this.barbers = barbers;
  }

  public barbers: Barber[] = [];

  @Input()
  public barbersPerPage;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.language = getCookie('lang');
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.spreadDataIntoPages();
  }

  switchPage(index) {
    for (const page of this.pages) {
      page.active = false;
    }

    this.pages[index].active = true;

    this.page = index;
  }

  private spreadDataIntoPages() {
    if (this.barbers.length === 0) {
      return;
    }

    let page: Page = {content: [], active: false};

    for (let i = 1; i <= this.barbers.length; i++) {

      if (page.content.length === this.barbersPerPage) {
        this.pages.push(page);
        page = {content: [], active: false};
      }

      const barber = this.barbers[i - 1];
      page.content.push(barber);

      // this means that we are at the end.
      if (i === this.barbers.length) {
        this.pages.push(page);
      }
    }

    this.pages[this.page].active = true;
  }

  book(barber: Barber) {
    // https://medium.com/ableneo/how-to-pass-data-between-routed-components-in-angular-2306308d8255
    this.router.navigate(['/book-now'], {
      state: {
        data: {
          barber
        },
      }
    });
  }
}
