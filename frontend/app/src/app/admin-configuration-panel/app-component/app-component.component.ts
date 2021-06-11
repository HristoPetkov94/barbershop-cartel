import {ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild,} from '@angular/core';
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
import {Barber} from '../../models/barber.model';
import {BarberService} from '../../services/barber.service';

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

  public barbers: Barber[];
  public selectedBarberId = 0;

  constructor(private appointmentService: AppointmentService, private barberService: BarberService) {
  }

  ngOnInit(): void {
    this.barberService.getBarbers().subscribe(barbers => {
      this.barbers = barbers;

      this.selectedBarberId = barbers[0].id;
      this.change();
    });

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
    let startOfWeekDate = startOfWeek(this.viewDate);
    let endOfWeekDate = addDays(startOfWeekDate, 7);

    this.appointmentService.getFor(this.selectedBarberId, startOfWeekDate, endOfWeekDate).subscribe(appointments => {
      let tempEvents: CalendarEvent[] = [];
      for (var appointment of appointments) {

        tempEvents.push({
          start: new Date(appointment.start),
          end: new Date(appointment.end),
          title: appointment.title,
          color: colors.yellow,
        });
      }

      this.events = tempEvents;
      this.refresh.next();
    });
  }
}
