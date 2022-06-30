import { Injectable } from '@angular/core';

import {
  BehaviorSubject,
  interval,
  Subject,
  Subscription,
  switchMap,
  tap } from 'rxjs';

import { AlienRequest } from '../interface/alien-request';
import { Alien } from '../wormhole/aliens-list/alien/alien.model';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class SimulatorService {

  constructor(private dataService: DataService) { }

  //The waiting time in seconds before the sumulator starts(initial value of the behaviour subject)
  initialWaitingTime = 5;

  // The min and max waiting time in seconds before emitting the next value
  minWaitingTime = 3;
  maxWaitingTime = 10;

  // The min and max position to emit with the value
  minPosition = 10;
  maxPosition = 100;

  alienRequest: AlienRequest;

  request = new Subject<AlienRequest>();

  alienToRemove = new Subscription();

  allAliens = [];
  // The avaialble aliens for the simulator
  availableAliens= [];

  // Emits an alien request within an interval of time
  private simulator = new BehaviorSubject<number>(this.initialWaitingTime);

  removeRequest = new Subject<AlienRequest>();

  timer: Subscription;

  initializeAliens() {
    // Initialize the array of alien for the simulator
    this.dataService.getAliens().subscribe(
      aliens => {
        this.allAliens = aliens;
        this.availableAliens = this.allAliens.slice();
      }
    );
  }

  start() {
    this.timer =
    this.simulator
    .pipe(
      switchMap( (waitingTime) => interval( waitingTime ) ),
      tap(() => {
        if(this.availableAliens.length) {
          //Generating a random alien and destination position
          let index = this.generateNumber(0, this.availableAliens.length);
          let destination = this.getRandomDestination();

          //Creating the alien request
          this.alienRequest = {
            alien: this.availableAliens[index],
            destination: destination
          }

          //Remove the alien from the array of availableAliens
          let removeId = this.availableAliens[index]['id'];
          this.availableAliens = this.availableAliens.filter(
            alien => {
              return alien['id'] != removeId;
            }
          )
          //Emit the request
          this.request.next(this.alienRequest);

          // Update interval with a new random value(waiting time for the next emit to happen)
          this.simulator.next(this.getRandomWaitingTime());
        }
      })
    ).subscribe();
  };

  stop() {
    //stop the simulator
    this.timer.unsubscribe();
  }

  reloadAlien(alien: Alien) {
    this.availableAliens.push(alien);
    console.log(this.availableAliens);
  }

  removeAlien(removeAlien: AlienRequest) {
    this.availableAliens.filter(alien =>{
      alien != removeAlien
    })
    return this.removeRequest.next(removeAlien)
  }

  getAlienById(id: string): Alien {
    return this.allAliens.filter(
      alien => {
        this.allAliens == alien.id;
      })
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
