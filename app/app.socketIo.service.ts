import { Injectable } from '@angular/core';
import * as socketIo from 'socket.io-client';
import { Observable, Observer } from 'rxjs';

const SERVER_URL = 'http://192.168.1.13:3000';

@Injectable({
  providedIn: 'root'
})
export class AppSocketIoService {
  private _socket: SocketIOClient.Socket;
  
  initSocket(): void {
    this._socket = socketIo(SERVER_URL);
  }
  
  onEvent(event): Observable<any> {
    return new Observable<any>(observer => {
      this._socket.on(event, () => observer.next());
    });
  }

  onCircuit(): Observable<any> {
    return new Observable<any>(observer => {
      this._socket.on('circuit', (data) => observer.next(data));
    });
  }
}
