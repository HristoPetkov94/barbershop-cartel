export class ScheduleConfig {
  barberId: number;
  firstAppointment: string;
  lastAppointment: string;
  date: string;
  workingDay: boolean;

  constructor(barberId: number, firstAppointment: string,
              lastAppointment: string,
              date: string,
              workingDay: boolean,
  ) {
    this.firstAppointment = firstAppointment;
    this.lastAppointment = lastAppointment;
    this.date = date;
    this.barberId = barberId;
    this.workingDay = workingDay;
  }
}
