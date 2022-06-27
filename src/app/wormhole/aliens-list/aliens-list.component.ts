import { Component, OnInit } from '@angular/core';
import { from, Observable, Subject, Subscription } from 'rxjs';
import { AlienRequest } from 'src/app/interface/alien-request';
import { DataService } from 'src/app/service/data.service';
import { SimulatorService } from 'src/app/service/simulator.service';
import { Alien } from './alien/alien.model';

@Component({
  selector: 'app-aliens-list',
  templateUrl: './aliens-list.component.html',
  styleUrls: ['./aliens-list.component.scss']
})
export class AliensListComponent implements OnInit {

  alienRequests: AlienRequest[] = [];

  isOpen = false;

  constructor(private simulator: SimulatorService) { }

  ngOnInit(): void {
    this.simulator.initializeAliens();
    this.simulator.request.subscribe(
      data => {
        this.alienRequests.push(data);
      })
  }

  toggleSimulator() {
    this.isOpen = !this.isOpen;
    if(this.isOpen) {
      this.simulator.start();
    } else {
      this.simulator.stop();
    }
  }
}
