import { AbstractTimeGate } from "./AbstractTimeGate"

/**
 * First-In-First-Out Time Gate
 *
 * In given period of time it will close gate after the first incoming passenger
 * After closing the gate, all incoming calls will be rejected until time to reopen the gate pass
 */
export class FIFOTimeGate extends AbstractTimeGate {

  constructor(timeWindow: number, callback: Function) {
    super(timeWindow, callback);
  }

  welcomeFunction(...passenger: any) {
    if (this.passenger == null) {
      this.passenger = passenger;
    }

    super.welcomeFunction();
  }

}
