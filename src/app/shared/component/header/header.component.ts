import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  language = 'alien';
  isAlienLang = true;

  constructor(private translateService: TranslateService) { }

  ngOnInit(): void {

  }

  onChangeLang()  {
    this.isAlienLang = !this.isAlienLang;
    if(this.isAlienLang) {
      this.language = 'alien';
      this.translateService.use('al')
    } else {
      this.language = 'english'
      this.translateService.use('en')
    }
  }

}
