export abstract class AbstractTimeGate {
  protected clock: NodeJS.Timeout | null;
  protected passenger: any | null;
  protected timeWindow: number;
  protected callback: Function;

  constructor(timeWindow: number, callback: Function) {
    this.clock = null;
    this.passenger = null;
    this.timeWindow = timeWindow;
    this.callback = callback;
  }

  launch() {
    if (this.passenger instanceof Array) {
      this.callback.apply(this.callback, this.passenger);
    } else {
      this.callback.call(this.callback, this.passenger);
    }

    this.clock = null;
    this.passenger = null;
  }

  protected start() {
    this.clock = globalThis.setTimeout(() => {
      this.launch();
    }, this.timeWindow);
  }

  abort() {
    globalThis.clearTimeout(this.clock);
    this.clock = null;
  }

  welcomeFunction() {
    if (this.clock == null) {
      this.start();
    }
  }

}
