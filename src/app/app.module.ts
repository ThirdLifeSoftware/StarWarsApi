import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {StarWarsService} from "./service/starwars.service";
import {StarWarsComponent} from "./component/starwars.component";

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,StarWarsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [StarWarsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
