import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../user/login/login.component';
import { AppComponent } from '../app.component';
import { AuthGuard } from '../service/auth-guard.service';
import { HeaderComponent } from '../shared/component/header/header.component';

const routes: Routes = [
  { path: '', component: HeaderComponent, canActivate: [AuthGuard] },
  { path:'operator', component: LoginComponent }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class RoutingModule { }
