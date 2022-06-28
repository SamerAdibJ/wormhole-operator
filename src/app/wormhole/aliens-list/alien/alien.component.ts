import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { AlienRequest } from 'src/app/interface/alien-request';
import { SimulatorService } from 'src/app/service/simulator.service';
import { TripService } from 'src/app/service/trip.service';
import { Alien } from './alien.model';

@Component({
  selector: 'app-alien',
  templateUrl: './alien.component.html',
  styleUrls: ['./alien.component.scss']
})
export class AlienComponent implements OnInit {
  panelOpenState = false;
  alienIconUrl = '../../../../assets/icons/alien.svg';
  request = false;

  @Input() alienRequest;

  constructor(
    private tripService: TripService,
    private simulator: SimulatorService
    ) { }

  ngOnInit(): void {

  }


  onAccept() {
    this.tripService.submitRequest(this.alienRequest);
  }

  onDecline() {
    this.tripService.cancelRequest(this.alienRequest);
  }
}
