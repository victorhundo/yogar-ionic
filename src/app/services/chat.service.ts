import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';
import { API } from 'src/app/API';


@Injectable({
  providedIn: 'root'
})
export class ChatService {
  // private socket: SocketIOClient.Socket;
  private socket: any;

  constructor() {
    this.socket = io(`${API}`);
  }

  joinRoom(conversation_id: string){
    this.socket.emit('subscribe', conversation_id);
  }

  // EMITTER
  sendMessage(msg: any) {
    this.socket.emit('sendMessage', msg);
  }

  getMessage(msgs: string[]){
    this.socket.on('sendMessage', (data) =>{
      msgs.push(data);
    })
  }
}
