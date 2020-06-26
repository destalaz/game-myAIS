import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';

import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CmsConfigComponent } from './cms-config/cms-config.component';
import { LoginComponent } from './login/login.component';

import { RouterModule, Routes } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { GameAunjaiInboxComponent } from './game-aunjai-inbox/game-aunjai-inbox.component';
import { TutorialPageComponent } from './game-aunjai-inbox/tutorial-page/tutorial-page.component';  // npm i @types/datatables.net --save-dev

import { AunjaiComponent } from './game/aunjai/aunjai.component';
import { HeaderGameComponent } from './game/aunjai/header-game/header-game.component';
import { LoadingGameComponent } from './game/aunjai/loading-game/loading-game.component';
import { PopupComponent  } from './game/aunjai/popup/popup.component';
import { RewardFlipComponent } from './game-aunjai-inbox/reward-flip/reward-flip.component';


const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'config', component: CmsConfigComponent },

  { path: '', component: LoadingGameComponent },
  { path: 'tutorial', component: TutorialPageComponent },
  { path: 'reward_flip', component: RewardFlipComponent },

  { path: 'aunjai', component: AunjaiComponent },
  { path: 'popup', component: PopupComponent},
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  // { path: '**', component: PagenofoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CmsConfigComponent,
    GameAunjaiInboxComponent,
    TutorialPageComponent,
    AunjaiComponent,
    HeaderGameComponent,
    LoadingGameComponent,
    PopupComponent,
    RewardFlipComponent
  ],
  imports: [
    DataTablesModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only set true
    )
    // other imports here

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
