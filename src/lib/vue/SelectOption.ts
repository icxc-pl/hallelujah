export class SelectOption {
  public value: string;
  public label: string;
  public selected: boolean = false;
  public disabled: boolean = false;

  constructor(value: string, label: string, selected: boolean = false, disabled: boolean = false) {
    this.value = value;
    this.label = label;
    this.selected = selected;
    this.disabled = disabled;
  }
}
