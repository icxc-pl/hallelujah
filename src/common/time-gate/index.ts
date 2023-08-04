import { FIFOTimeGate } from "./FIFOTimeGate";
import { FILOTimeGate } from "./FILOTimeGate";
import { LIFOTimeGate } from "./LIFOTimeGate";

function fifoTimeGate(timeWindow: number, callback: Function): Function {
  const gate = new FIFOTimeGate(timeWindow, callback);
  return gate.welcomeFunction.bind(gate);
}

function filoTimeGate(timeWindow: number, callback: Function): Function {
  const gate = new FILOTimeGate(timeWindow, callback);
  return gate.welcomeFunction.bind(gate);
}

function lifoTimeGate(timeWindow: number, callback: Function): Function {
  const gate = new LIFOTimeGate(timeWindow, callback);
  return gate.welcomeFunction.bind(gate);
}

export {
  fifoTimeGate,
  filoTimeGate,
  lifoTimeGate
};
