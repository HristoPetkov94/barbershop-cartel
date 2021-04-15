export class Step {
  label: string;
  disabled: boolean;
  defaultLabel: string;

  constructor(label: string, disabled: boolean) {
    this.label = label;
    this.disabled = disabled;
    this.defaultLabel = label;
  }
}
