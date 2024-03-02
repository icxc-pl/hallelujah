import { v4 as uuid } from 'uuid';
import { ClientRequestCommand } from './ClientRequestCommand';

export class ClientRequest {
  public uuid: string = uuid();

  constructor(
    public command: ClientRequestCommand,
    public args?: any
  ) {}
}
