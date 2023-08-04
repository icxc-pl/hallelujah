import { AbstractTimeGate } from "./AbstractTimeGate"

/**
 * First-In-Last-Out Time Gate
 *
 * First passanger activates time gate, but clock will reset after each incoming passenger,
 * so in the end only the last passanger will get out.
 */
export class FILOTimeGate extends AbstractTimeGate {

  // constructor(timeWindow: number, callback: Function) {
  //   super(timeWindow, callback);
  // }

  welcomeFunction(...passenger: any) {
    this.passenger = passenger;

    if (this.clock != null) {
      this.abort();
    }

    super.welcomeFunction();
  }

}
