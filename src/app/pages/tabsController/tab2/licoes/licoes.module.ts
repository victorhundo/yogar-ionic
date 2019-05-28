import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { MatVideoModule } from 'mat-video';
import {MatCardModule} from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonModule} from '@angular/material/button';



import { IonicModule } from '@ionic/angular';

import { LicoesPage } from './licoes.page';

const routes: Routes = [
  {
    path: '',
    component: LicoesPage
  }
];

@NgModule({
  imports: [
    MatCardModule,
    MatVideoModule,
    MatExpansionModule,
    MatButtonModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LicoesPage]
})
export class LicoesPageModule {
}
