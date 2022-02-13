export class DashboardRequestModel {
  barberIds;
  startDate;
  endDate;

  constructor(barberId, startDate, endDate) {
    this.barberIds = barberId;
    this.startDate = startDate;
    this.endDate = endDate;
  }
}
