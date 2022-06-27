import { Injectable } from '@angular/core';
import { BehaviorSubject, from, interval, map, Observable, Subject, switchMap, take, takeWhile, tap } from 'rxjs';
import { Alien } from '../wormhole/aliens-list/alien/alien.model';
import { DataService } from './data.service';

export interface AlienRequest {
  alienId: string;
  destination: number;
}

@Injectable({
  providedIn: 'root'
})
export class SimulatorService {

  timer: Observable<number>;

  constructor(private dataService: DataService) { }

  //The waiting time befor the sumulator starts(initial value of the behaviour subject)
  initialWaitingTime = 5;

  // The min and max waiting time before emitting the next value
  minWaitingTime = 5;
  maxWaitingTime = 15;

  // The min and max position to emit with the value
  minPosition = 10;
  maxPosition = 100;

  alienRequest: AlienRequest;
  request = new Subject<AlienRequest>();

  // The avaialble aliens for the simulator
  availableAliens= [];

  // Aliens initial value
  aliens: Alien[];

  // Emits an alien request within an interval of time
  private simulator = new BehaviorSubject<number>(0);

  initializeAliens() {
    // Initialize the array of alien for the simulator
    this.dataService.getAliens().subscribe(
      aliens => {
        this.availableAliens = aliens;
      }
    );
  }

  start() {
    this.simulator
    .pipe(
      switchMap( (waitingTime) => interval( waitingTime ) ),
      tap(() => {
        if(this.availableAliens.length) {
          let destination = this.getRandomDestination();
          let index = this.generateNumber(0, this.availableAliens.length);

          this.alienRequest = {
            alienId: this.availableAliens[index]['id'],
            destination: destination
          }

          let removeId = this.availableAliens[index]['id'];

          this.availableAliens = this.availableAliens.filter(
            alien => {
              return alien['id'] != removeId;
            }
          )

          this.request.next(this.alienRequest);

          // Update interval with a new random value(waiting time for the next emit to happen)
          this.simulator.next( this.getRandomWaitingTime() );
        }
      })
    )
    .subscribe();
  };

  stop() {
    //stop the simulator
    console.log('stop');
  }

  private generateNumber(min, max) {
    // returns a random integer between min and max
    let randomInt = Math.floor(min + Math.random() * (max - min));
    return randomInt;
  }

  private getRandomWaitingTime() {
    //return waiting time in ms
    return  this.generateNumber(this.minWaitingTime, this.maxWaitingTime) * 1000;
  }

  private getRandomDestination() {
    //return random destination between min and max position
    return  this.generateNumber(this.minPosition, this.maxPosition);
  }
}
