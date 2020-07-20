import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';

import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RouterModule, Routes } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { TutorialPageComponent } from './game-aunjai-inbox/tutorial-page/tutorial-page.component';  // npm i @types/datatables.net --save-dev

import { AunjaiComponent } from './game/aunjai/aunjai.component';
import { HeaderGameComponent } from './game/aunjai/header-game/header-game.component';
import { LoadingGameComponent } from './game/aunjai/loading-game/loading-game.component';
import { PopupComponent } from './game/aunjai/popup/popup.component';
import { RewardFlipComponent } from './game-aunjai-inbox/reward-flip/reward-flip.component';
import { PopupWinComponent } from './game/aunjai/popup-win/popup-win.component';
import { PopupLoseComponent } from './game/aunjai/popup-lose/popup-lose.component';
import { PopupContinueComponent } from './game/aunjai/popup-continue/popup-continue.component';
import { PopupReadyComponent } from './game/aunjai/popup-ready/popup-ready.component';
import { PopupErrorComponent } from './game/aunjai/popup-error/popup-error.component';
import { CheckPermissionLoginComponent } from './check-permission-login/check-permission-login.component';
import { RewardFlipEngComponent } from './game-aunjai-inbox/reward-flip-eng/reward-flip-eng.component';
import { TutorialPageEngComponent } from './game-aunjai-inbox/tutorial-page-eng/tutorial-page-eng.component';
import { ErrorPageComponent } from './game/aunjai/error-page/error-page.component';
import { NetworkChkComponent } from './game/network-chk/network-chk.component';


const appRoutes: Routes = [
  { path: '', component: CheckPermissionLoginComponent },
  { path: 'reload', component: CheckPermissionLoginComponent },
  { path: 'loadgame', component: LoadingGameComponent },
  { path: 'tutorial', component: TutorialPageComponent },
  { path: 'reward_flip', component: RewardFlipComponent },
  { path: 'reward_flip_eng', component: RewardFlipEngComponent},

  { path: 'aunjai', component: AunjaiComponent },
  { path: 'aunjai1', component: AunjaiComponent },
  { path: 'aunjai2', component: AunjaiComponent },
  { path: 'aunjai3', component: AunjaiComponent },
  { path: 'aunjai4', component: AunjaiComponent },
  { path: 'aunjai5', component: AunjaiComponent },
  { path: 'popup', component: PopupComponent },
  { path: 'popupWin', component: PopupWinComponent },
  { path: 'popupContinue', component: PopupContinueComponent },
  { path: 'popupLose', component: PopupLoseComponent },
  { path: 'popupError', component: PopupErrorComponent },
  { path: 'popupReady', component: PopupReadyComponent },
  { path: 'error-page', component: ErrorPageComponent },
  { path: 'network-Chk', component: NetworkChkComponent },
  // { path: '**', component: PagenofoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    TutorialPageComponent,
    AunjaiComponent,
    HeaderGameComponent,
    LoadingGameComponent,
    PopupComponent,
    RewardFlipComponent,
    PopupWinComponent,
    PopupLoseComponent,
    PopupContinueComponent,
    PopupReadyComponent,
    PopupErrorComponent,
    CheckPermissionLoginComponent,
    RewardFlipEngComponent,
    TutorialPageEngComponent,
    ErrorPageComponent,
    NetworkChkComponent
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
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
