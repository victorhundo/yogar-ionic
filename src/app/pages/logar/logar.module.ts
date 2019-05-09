import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';

import { LogarPage } from './logar.page';

const routes: Routes = [
  {
    path: '',
    component: LogarPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    MatFormFieldModule ,
    MatButtonModule,
    MatToolbarModule,
    MatGridListModule,
    MatCardModule,
    MatInputModule
  ],
  declarations: [LogarPage]
})
export class LogarPageModule {}
