import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  languages = ['al', 'en'];

  constructor(private auth: AuthService, private translateService: TranslateService) {}

  ngOnInit(): void {
    //Check the autoLogin guard first
    this.auth.autoLogin();

    //add suppoted languages
    this.translateService.addLangs(this.languages);
    this.translateService.setDefaultLang('al');

    //check local storage
    if(localStorage.getItem('language')) {
      let lang = localStorage.getItem('language');
      this.translateService.use(lang);
    }
    else {
      this.translateService.use('al');
    }
  }
}
