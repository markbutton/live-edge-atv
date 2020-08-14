import { NgModule, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Socket, SocketIoModule } from 'ngx-socket-io';

import { environment } from '../../../environments/environment';

@Injectable()
export class SocketAPI extends Socket {
  constructor() {
    super({ url: environment.socketUrl, options: {transports: ['websocket']} });
  }
}

@Injectable()
export class SocketLog extends Socket {
  constructor() {
    super({ url: environment.logSocket, options: {transports: ['websocket']} });
  }
}

@NgModule({
  imports: [
    CommonModule,
    SocketIoModule
  ],
  providers: [
    SocketAPI,
    SocketLog
  ]
})
export class SocketModule { }
