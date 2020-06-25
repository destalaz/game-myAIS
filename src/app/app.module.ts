import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';

import { AppComponent } from './app.component';
import { AunjaiComponent } from './game/aunjai/aunjai.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CmsConfigComponent } from './cms-config/cms-config.component';

import { RouterModule, Routes } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { GameAunjaiInboxComponent } from './game-aunjai-inbox/game-aunjai-inbox.component';
import { TutorialPageComponent } from './game-aunjai-inbox/tutorial-page/tutorial-page.component';  // npm i @types/datatables.net --save-dev
import { HeaderGameComponent } from './game/aunjai/header-game/header-game.component';
import { PopupComponent } from './game/aunjai/popup/popup.component';
import { LoadingGameComponent } from './game/aunjai/loading-game/loading-game.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'config', component: CmsConfigComponent },
  { path: 'game', component: GameAunjaiInboxComponent },
  { path: 'tutorial', component: TutorialPageComponent },
  { path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  // { path: '**', component: PagenofoundComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    AunjaiComponent,
    LoginComponent,
    CmsConfigComponent,
    GameAunjaiInboxComponent,
    TutorialPageComponent,
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
