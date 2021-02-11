export class Step {

  public type: string;
  public title: string;
  public disabled: boolean;
  public active: string;
  public default: string;

  public next: Step;

  constructor(type: string, title: string, disabled: boolean, active: string) {
    this.type = type;
    this.title = title;
    this.disabled = disabled;
    this.active = active;
    this.default = title;
  }

  isLast(): boolean {
    return this.next === undefined;
  }

  isNextDisabled(): boolean {
    return this.next.disabled === false;
  }

  hasNext() {
    return this.next !== undefined;
  }
}
