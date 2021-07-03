import {ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {
  addDays,
  addHours,
  endOfDay,
  endOfMonth,
  isSameDay,
  isSameMonth,
  startOfDay, startOfWeek,
  subDays,
} from 'date-fns';
import {Subject} from 'rxjs';
import {CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView,} from 'angular-calendar';
import {AppointmentService} from '../../services/appointment.service';
import {BarberService} from '../../services/barber.service';
import {Barber} from '../../models/barber.model';

import * as SockJS from 'sockjs-client';
import {Stomp} from '@stomp/stompjs';
import {Dropdown} from './dropdown';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

const appointmentColors = [
  {
    available: {
      primary: '#91ed71',
      secondary: '#91ed71',
    },
    unavailable:   {
      primary: '#e8ffe8',
      secondary: '#e8ffe8',
    },
  },
  {
    available: {
      primary: '#4fcbca',
      secondary: '#4fcbca',
    },
    unavailable:   {
      primary: '#D1E8FF',
      secondary: '#D1E8FF',
    },
  },
  {
    available: {
      primary: '#ff7d46',
      secondary: '#ff7d46',
    },
    unavailable:   {
      primary: '#ffc1a6',
      secondary: '#ffc1a6',
    },
  },
  {
    available: {
      primary: '#ff71b1',
      secondary: '#ff71b1',
    },
    unavailable:   {
      primary: '#ffd7ea',
      secondary: '#ffd7ea',
    },
  },
];

@Component({
  selector: 'app-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['app-component.component.css'],
  templateUrl: 'app-component.component.html',
})
export class AppComponentComponent implements OnInit {
  @ViewChild('modalContent', {static: true}) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Week;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  private barberToColor = new Map();

  public barbers: Barber[];
  public barberDropdowns: Dropdown[] = [];

  public selectedBarberIndex: number;

  public fullscreen: boolean = false;

  private stompClient = null;


  // setConnected(connected: boolean) {
  //   this.disabled = !connected;
  //
  //   if (connected) {
  //     this.greetings = [];
  //   }
  // }

  connect() {
    const socket = new SockJS('/api/gkz-stomp-endpoint');
    this.stompClient = Stomp.over(socket);

    const _this = this;
    this.stompClient.connect({}, function (frame) {
      // _this.setConnected(true);
      console.log('Connected: ' + frame);
      console.log(socket._transport.url);

      _this.stompClient.subscribe('/topic/event-added', function (hello) {
        console.log('Message: ' + frame);
        _this.change();
      });

    });
  }

  constructor(private appointmentService: AppointmentService, private barberService: BarberService) {
  }

  ngOnInit(): void {
    this.barberService.getBarbers().subscribe(barbers => {

      this.barbers = barbers;

      barbers.forEach((value, index) => {
        let color = appointmentColors[index];

        this.barberToColor.set(value.id, color);
      });

      const allBarberIds = barbers.map(barber => barber.id);
      this.barberDropdowns.push(new Dropdown(allBarberIds, 'All barbers'));

      const dropdowns = barbers.map(barber => {
        return new Dropdown([barber.id], `${barber.firstName} ${barber.lastName}`);
      });
      dropdowns.forEach(dropdown => this.barberDropdowns.push(dropdown));

      this.selectedBarberIndex = 0;

      this.change();
    });

    document.addEventListener('fullscreenchange', (event) => {
      // document.fullscreenElement will point to the element that
      // is in fullscreen mode if there is one. If there isn't one,
      // the value of the property is null.
      if (document.fullscreenElement) {
        console.log(`Element: ${document.fullscreenElement.id} entered full-screen mode.`);
      } else {
        this.fullscreen = false;
        this.refresh.next();
      }
    });

    this.connect();
  }

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({event}: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({event}: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [
    {
      start: startOfWeek(new Date()),
      end: addDays(startOfWeek(new Date()), 7),
      title: 'Loading...',
      color: colors.yellow,
      actions: this.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    }
  ];

  activeDayIsOpen: boolean = true;

  dayClicked({date, events}: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
                      event,
                      newStart,
                      newEnd,
                    }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = {event, action};

    console.log(this.modalData);
  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
    this.change();
  }

  change() {
    let startOfWeekDate = startOfWeek(this.viewDate, { weekStartsOn : 1});
    let endOfWeekDate = addDays(startOfWeekDate, 7);

    let barberIds = this.barberDropdowns[this.selectedBarberIndex].barberIds;

    this.appointmentService.getFor(barberIds, startOfWeekDate, endOfWeekDate).subscribe(appointments => {
      let tempEvents: CalendarEvent[] = [];
      for (const appointment of appointments) {

        let color;

        if (this.barberToColor.has(appointment.barberId)) {
          let colors = this.barberToColor.get(appointment.barberId);

          if(appointment.id > 0){
            color = colors.available;
          } else {
            color = colors.unavailable;
          }
        }

        tempEvents.push({
          start: new Date(appointment.start),
          end: new Date(appointment.end),
          title: appointment.title,
          color: color,
        });
      }

      this.events = tempEvents;
      this.refresh.next();
    });
  }

  toggleFullscreen() {
    this.fullscreen = !this.fullscreen;
    this.toggleFullScreenPage();
  }

  toggleFullScreenPage() {
    let doc = window.document;
    let docEl = doc.documentElement;

    let requestFullScreen = docEl.requestFullscreen;
    let cancelFullScreen = doc.exitFullscreen;

    if(!doc.fullscreenElement) {
      requestFullScreen.call(docEl);
    }
    else {
      cancelFullScreen.call(doc);
    }
  }
}