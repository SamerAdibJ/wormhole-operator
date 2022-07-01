import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './shared/material/material.module';
import { LoginComponent } from './user/login/login.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './shared/component/header/header.component';
import { RouterModule } from '@angular/router';
import { RoutingModule } from './routing/routing.module';
import { WormholeComponent } from './wormhole/wormhole.component';
import { AliensListComponent } from './wormhole/aliens-list/aliens-list.component';
import { AlienComponent } from './wormhole/aliens-list/alien/alien.component';
import { TravelersListComponent } from './wormhole/travelers-list/travelers-list.component';
import { TravelerComponent } from './wormhole/travelers-list/traveler/traveler.component';
import { TripsListComponent } from './wormhole/trips-list/trips-list.component';
import { TripComponent } from './wormhole/trips-list/trip/trip.component';
import { NG_EVENT_PLUGINS } from '@tinkoff/ng-event-plugins';
import { ScrollbarModule } from './shared/component/scrollbar/scrollbar.module';
import { FilterPipe } from './pipes/filter.pipe';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';






@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    WormholeComponent,
    AliensListComponent,
    AlienComponent,
    TravelersListComponent,
    TravelerComponent,
    TripsListComponent,
    TripComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    RouterModule,
    RoutingModule,
    ScrollbarModule,
    TranslateModule.forRoot(
      {
        loader: {
          provide: TranslateLoader,
          useFactory: (http: HttpClient) => { return new TranslateHttpLoader(http, '/assets/i18n/', '.json');},
          deps: [HttpClient]
        }
      }
    )
  ],
  providers: NG_EVENT_PLUGINS,
  bootstrap: [AppComponent]
})
export class AppModule { }
