export class DataContainer {
  public data: Array<Object> | Object | null = null;
  public loading: boolean = true;

  constructor() {}

  public setData(data: Array<Object> | Object | null) {
    this.data = data;
    this.loading = false;
  }

}
