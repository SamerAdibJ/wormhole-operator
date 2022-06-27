import { Component, OnInit } from '@angular/core';
import { from, Observable, Subject, Subscription } from 'rxjs';
import { DataService } from 'src/app/service/data.service';
import { SimulatorService } from 'src/app/service/simulator.service';
import { Alien } from './alien/alien.model';

@Component({
  selector: 'app-aliens-list',
  templateUrl: './aliens-list.component.html',
  styleUrls: ['./aliens-list.component.scss']
})
export class AliensListComponent implements OnInit {

  alienRequests: Alien[] = [];

  isOpen = false;

  constructor(
    private dataService: DataService,
    private simulator: SimulatorService
  ) { }

  ngOnInit(): void {
    this.simulator.initializeAliens();
    this.simulator.request.subscribe(
      data => {
        // console.log(data);
        this.alienRequests.push(data);
        console.log(this.alienRequests);

      })
    // this.getAllAliens();
    // this.availableAliens.next(this.Aliens);
  }

  // getAllAliens() {
  //   this.dataService.getAliens().subscribe((aliens)=> {
  //     this.Aliens = aliens;
  //   });
  // }

  toggleSimulator() {
    this.isOpen = !this.isOpen;
    if(this.isOpen) {
      this.simulator.start();
    } else {
      this.simulator.stop();
    }
  }
}
