import { v4 as uuid } from 'uuid';
import { ReqCommand } from './ReqCommand';

export class Req {
  public uuid: string = uuid();

  constructor(
    public command: ReqCommand,
    public args?: any
  ) {}
}
