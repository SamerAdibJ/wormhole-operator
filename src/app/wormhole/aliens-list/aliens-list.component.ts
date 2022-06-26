import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { Alien } from './alien/alien.model';

@Component({
  selector: 'app-aliens-list',
  templateUrl: './aliens-list.component.html',
  styleUrls: ['./aliens-list.component.scss']
})
export class AliensListComponent implements OnInit {

  Aliens: Alien[];
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getAliens().subscribe(
      aliensData => {
        this.Aliens = aliensData;
      }
    )
  }

}
