import { Component, OnInit } from '@angular/core';
import { AlienRequest } from 'src/app/interface/alien-request';
import { SimulatorService } from 'src/app/service/simulator.service';
import { TripService } from 'src/app/service/trip.service';

@Component({
  selector: 'app-aliens-list',
  templateUrl: './aliens-list.component.html',
  styleUrls: ['./aliens-list.component.scss']
})
export class AliensListComponent implements OnInit {

  alienRequests: AlienRequest[] = [];
  selectedRequestId;
  isOpen = false;

  constructor(
    private simulator: SimulatorService,
    private tripService: TripService
  ) { }

  ngOnInit(): void {
    this.simulator.initializeAliens();
    this.simulator.request.subscribe(
      data => {
        this.alienRequests.push(data);
      }
    );

    this.tripService.declineRequest.subscribe(
      declinedRequest => {
        this.alienRequests = this.alienRequests.filter(
          request => {
            return request != declinedRequest;
          }
        )

        //Add the alien again to the simulator waiting list
        this.simulator.reloadAlien(declinedRequest.alien);
      })

    this.simulator.removeRequest.subscribe(
      request =>{
        //unselect the approved alien request
        this.selectedRequestId = null;

        //Remove the request from the simulator waiting list
        this.alienRequests = this.alienRequests.filter(
          alienRequest=> {
            return alienRequest.alien['id'] != request.alien['id'];
          }
        );
      }
    )
  }

  toggleSimulator() {
    this.isOpen = !this.isOpen;
    if(this.isOpen) {
      this.simulator.start();
    } else {
      this.simulator.stop();
    }
  }

  selected(id) {
    this.selectedRequestId = id;
  }

}
