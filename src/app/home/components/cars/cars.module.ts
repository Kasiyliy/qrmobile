import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CarsPage } from './cars.page';
import {CarsRoutingModule} from './cars-routing.module';
import {CarAddComponent} from './car-add/car-add.component';
import {CarListComponent} from './car-list/car-list.component';
import {ItemsRoutingModule} from '../items/items-routing.module';



@NgModule({
  imports: [
    ReactiveFormsModule,
    CarsRoutingModule,
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  declarations: [
      CarsPage,
    CarAddComponent,
    CarListComponent
  ]
})
export class CarsPageModule {}
