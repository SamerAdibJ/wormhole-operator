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
    this.auth.autoLogin();

    this.translateService.addLangs(this.languages);
    this.translateService.setDefaultLang('al');
    this.translateService.use('al');
  }
}
