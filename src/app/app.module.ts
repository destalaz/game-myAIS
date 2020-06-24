import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AunjaiComponent } from './game/aunjai/aunjai.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HeaderGameComponent } from './game/aunjai/header-game/header-game.component';
import { PopupComponent } from './game/aunjai/popup/popup.component';
import { LoadingGameComponent } from './game/aunjai/loading-game/loading-game.component';

@NgModule({
  declarations: [
    AppComponent,
    AunjaiComponent,
    LoginComponent,
    HeaderGameComponent,
    PopupComponent,
    LoadingGameComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
