import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../user/login/login.component';
import { AuthGuard } from '../service/auth.guard';
import { WormholeComponent } from '../wormhole/wormhole.component';
import { AutoLoginGuard } from '../user/login/auto-login.guard';

const routes: Routes = [
  { path: '', component: WormholeComponent,  canActivate: [AuthGuard] },
  { path:'operator', component: LoginComponent, canActivate: [AutoLoginGuard]}
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
