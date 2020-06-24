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
    LoginComponent,
    CmsConfigComponent,
    GameAunjaiInboxComponent,
    TutorialPageComponent
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
