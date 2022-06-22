import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  language = 'alien';
  isAlienLang = true;

  constructor() { }

  ngOnInit(): void {

  }

  onChangeLang()  {
    this.isAlienLang = !this.isAlienLang;
    if(this.isAlienLang) {
      this.language = 'alien';
    } else {
      this.language = 'english'
    }
  }

}
