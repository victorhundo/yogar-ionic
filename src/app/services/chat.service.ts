import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  // private socket: SocketIOClient.Socket;
  private socket: any;

  constructor() {
    this.socket = io("http://127.0.0.1:3000");
  }

  // EMITTER
  sendMessage(msg: object) {
    this.socket.emit('sendMessage', msg);
  }

  getMessage(msgs: string[]){
    this.socket.on('sendMessage', (data) =>{
      msgs.push(data);
    })
  }
}
