import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Page} from './page';
import {animate, style, transition, trigger} from '@angular/animations';
import {BarberService} from '../services/barber.service';
import {Barber} from '../models/barber';


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
export class BarberPaginatorComponent implements OnInit {

  @ViewChild('paginator', {static: true}) paginator: ElementRef;

  public page = 0;
  public pages: Page[] = [];
  public barbers: Barber[];

  @Input()
  public data;

  @Input()
  public numberOfPages;

  constructor(private barberService: BarberService) {
  }

  ngOnInit() {
    this.spreadDataIntoPages();

    this.barberService.getAll().subscribe(b => {
      this.barbers = b;
    });
  }

  switchPage(index) {
    for (const page of this.pages) {
      page.active = false;
    }

    this.pages[index].active = true;

    this.page = index;
  }

  private spreadDataIntoPages() {
    let page: Page = {content: [], active: false};

    for (let i = 1; i <= this.data.length; i++) {

      if (page.content.length === this.numberOfPages) {
        this.pages.push(page);
        page = {content: [], active: false};
      }

      page.content.push(this.data[i - 1]);

      // this means that we are at the end.
      if (i === this.data.length) {
        this.pages.push(page);
      }
    }

    this.pages[this.page].active = true;

    console.log(this.pages);
  }
}
