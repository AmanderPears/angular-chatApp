import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private socket: SocketIOClient.Socket;
  public getMessages: any;

  constructor() {
    this.getMessages = new Subject();
    this.socket = io.connect('http://localhost:8080');
    this.socket.on('chat message', msg => {
      this.getMessages.next(msg);
    });
  }

  sendMessage(msg) {
    this.socket.emit('chat message', msg);
  }

  getSocket() {
    return this.socket;
  }
}
