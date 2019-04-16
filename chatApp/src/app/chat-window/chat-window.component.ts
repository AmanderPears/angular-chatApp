import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { Observable } from 'rxjs';
import { all } from 'q';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent implements OnInit {

  private getMessagesSub: any;
  private getClientsSub: any;
  messages: string[] = [];
  currentChannel: string = "all";
  currentMessage: string;
  socket: any = {};
  clients: any[] = [];

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.getMessagesSub = this.chatService.getMessages.subscribe(data => {
      this.messages.push(data);
      this.socket = this.chatService.getSocket();
    });

    this.getClientsSub = this.chatService.clients.subscribe(data => {
      this.clients = data;
    });
  }

  roomChat(roomId) {
    this.chatService.roomChat(roomId, this.currentMessage);
  }

  setChannel(id) {
    this.currentChannel = id;
  }

  sendMessage() {
    if (this.currentChannel == "all") {
      this.chatService.sendMessage(this.currentMessage);
    } else {
      this.roomChat(this.currentChannel);
    }
    this.currentMessage = "";
  }

  ngOnDestroy() {
    if (this.getMessagesSub) {
      this.getMessagesSub.unsubscribe();
    }

    if (this.getClientsSub) {
      this.getClientsSub.unsubscribe();
    }
  }

}
