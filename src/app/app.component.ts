import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WebsocketService } from './services/websocket.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent {
  name = 'Angular';

  constructor(private service: WebsocketService) {}

  send(msg: string) {
    this.service.send(msg);
  }

  connect() {
    this.service.connect();
  }

  disconnect() {
    this.service.disconnect();
  }
}
