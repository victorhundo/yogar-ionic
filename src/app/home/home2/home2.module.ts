import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Home2PageRoutingModule } from './home2.router.module';

import { Home2Page } from './home2.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Home2PageRoutingModule
  ],
  declarations: [Home2Page]
})
export class Home2PageModule {}
