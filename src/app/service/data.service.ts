import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Alien } from '../wormhole/aliens-list/alien/alien.model';
import { Traveler } from '../wormhole/travelers-list/traveler/traveler.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  AliensUrl: string = 'https://62ab3161bd0e5d29af0a4f59.mockapi.io/api/v1/alien';
  TravelersUrl: string = 'https://62ab3161bd0e5d29af0a4f59.mockapi.io/api/v1/traveler';

  constructor(private http: HttpClient) {}

  getAliens(): Observable<Alien[]> {
    return this.http.get<Alien[]>(this.AliensUrl);
  }

  getTravelers(): Observable<Traveler[]> {
    return this.http.get<Traveler[]>(this.TravelersUrl);
  }
}
