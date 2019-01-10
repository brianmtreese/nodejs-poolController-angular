import { Component } from '@angular/core';
import { AppSocketIoService } from './app.socketIo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Angular Pool Controller';
  ioConnection: any;
  circuits = [];
  
  constructor(private appSocketIoService: AppSocketIoService) { }
  
  ngOnInit(): void {
    this.initIoConnection();
  }
  
  private initIoConnection(): void {
    this.appSocketIoService.initSocket();

    this.ioConnection = this.appSocketIoService.onCircuit()
      .subscribe((circuit) => {
	this.circuits = Object.values(circuit.circuit);
        //for(var i in circuit.circuit)
          //this.circuits.push([i, parsed [i]]);
        console.log(this.circuits);
      });
    
    this.appSocketIoService.onEvent('connect')
      .subscribe(() => {
        console.log('connected');
      });
      
    this.appSocketIoService.onEvent('disconnect')
      .subscribe(() => {
        console.log('disconnected');
      });
      
  }
}
