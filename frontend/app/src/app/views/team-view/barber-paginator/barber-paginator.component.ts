import {
  AfterViewInit,
  Component, ComponentFactoryResolver,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {Page} from './page';
import {animate, style, transition, trigger} from '@angular/animations';
import {Barber} from '../../../models/barber.model';
import {Router} from '@angular/router';
import {BarberFlipCardComponent} from '../barber-flip-card/barber-flip-card.component';

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
export class BarberPaginatorComponent implements OnInit, OnChanges, AfterViewInit {

  // @ViewChild('flipper', {static: false}) child: BarberFlipCardComponent;
  @ViewChild('container', { read: ViewContainerRef, static: false }) viewContainerRef?: ViewContainerRef;


  public page = 0;
  public pages: Page[] = [];

  @Input()
  get data(): any[] {
    return this.barbers;
  }

  set data(barbers: any[]) {
    this.barbers = barbers;
  }

  public barbers: any[] = [];

  @Input()
  public barbersPerPage;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
  }



  ngOnInit(): void {

  }

  ngAfterViewInit() {

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.spreadDataIntoPages();

    const factory = this.componentFactoryResolver.resolveComponentFactory(BarberFlipCardComponent);
    const ref = this.viewContainerRef.createComponent(factory);
    ref.instance.barber = this.data[0];
    ref.changeDetectorRef.detectChanges();
    console.log(this.data[0]);
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
}
