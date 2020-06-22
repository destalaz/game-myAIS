import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AunjaiComponent } from './game/aunjai/aunjai.component';

@NgModule({
  declarations: [
    AppComponent,
    AunjaiComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
