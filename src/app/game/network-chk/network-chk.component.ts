import { Component, OnInit } from '@angular/core';
import { ConnectionService } from 'ng-connection-service';
@Component({
  selector: 'network-Chk',
  templateUrl: './network-chk.component.html',
  styleUrls: ['./network-chk.component.scss']
})
export class NetworkChkComponent implements OnInit {
  status = 'ONLINE';
  isConnected = true;
  constructor(private connectionService: ConnectionService) {
    this.connectionService.monitor().subscribe(isConnected => {
      this.isConnected = isConnected;
      if (this.isConnected) {
        this.status = "ONLINE";
      }
      else {
        this.status = "OFFLINE";
      }
    })
   }

  ngOnInit() {
  }

}
