import { Component, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { SimulatorService } from 'src/app/service/simulator.service';
import { TripService } from 'src/app/service/trip.service';

@Component({
  selector: 'app-alien',
  templateUrl: './alien.component.html',
  styleUrls: ['./alien.component.scss']
})
export class AlienComponent implements OnInit {
  panelOpenState = false;
  alienIconUrl = '../../../../assets/icons/alien.svg';
  request = false;
  @Input() controls = true;

  @Input() alienRequest;
  @Output() isSelected = new Subject<number>();
  constructor(
    private tripService: TripService,
    private simulator: SimulatorService
    ) { }

  ngOnInit(): void {

  }


  onAccept() {
    this.tripService.submitRequest(this.alienRequest);
    this.isSelected.next(this.alienRequest.alien.id);
  }

  onDecline() {
    this.tripService.cancelRequest(this.alienRequest);
    // this.isSelected.next(false);
  }
}
