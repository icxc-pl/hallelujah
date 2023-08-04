import { AbstractTimeGate } from "./AbstractTimeGate"

/**
 * Last-In-First-Out Time Gate
 *
 * In given period of time it will close gate after the last incoming passenger
 * First incoming passenger will trigger closing the gate. After given time period the game will be closed,
 * last passenger will win and clock will reset
 */
export class LIFOTimeGate extends AbstractTimeGate {

  constructor(timeWindow: number, callback: Function) {
    super(timeWindow, callback);
  }

  welcomeFunction(...passenger: any) {
    this.passenger = passenger;

    super.welcomeFunction();
  }

}
