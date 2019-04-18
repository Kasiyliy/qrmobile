import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IonicModule, IonTabs} from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { HomePage } from './home.page';
import {HomeRoutingModule} from './home-routing.module';
import {MainComponent} from './components/main/main.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeRoutingModule
  ],
  declarations: [HomePage, MainComponent]
})
export class HomePageModule {}
