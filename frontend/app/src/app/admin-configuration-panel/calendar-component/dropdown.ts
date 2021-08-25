export class Dropdown {
  public barberIds: number[];
  public label: string;

  constructor(barberIds: number[], label: string) {
    this.barberIds = barberIds;
    this.label = label;
  }
}
