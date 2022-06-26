import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSelectModule} from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatListModule} from '@angular/material/list';



@NgModule({
  declarations: [],
  exports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatTooltipModule,
    MatToolbarModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatProgressBarModule,
    MatExpansionModule,
    MatListModule
  ]
})
export class MaterialModule { }
