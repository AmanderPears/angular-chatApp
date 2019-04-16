import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  socket: SocketIOClient.Socket;
  public getMessages: any;
  public clients: any;

  constructor() {
    this.getMessages = new Subject();
    this.socket = io.connect('http://localhost:8080');
    this.socket.on('chat message', msg => {
      this.getMessages.next(msg);
    });

    this.clients = new Subject();
    this.socket.on('requestClient', data => {
      this.clients.next(data);
    });
  }

  sendMessage(msg) {
    this.socket.emit('chat message', msg);
  }

  roomChat(id, msg) {
    this.socket.emit('roomChat', id, msg);
  }

  getSocket() {
    return this.socket;
  }
}
