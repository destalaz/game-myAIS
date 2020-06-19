import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CmsConfigComponent } from './cms-config/cms-config.component';
import { LoginComponent } from './login/login.component';

import { RouterModule, Routes } from '@angular/router';


const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'config', component: CmsConfigComponent },
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
    CmsConfigComponent
  ],
  imports: [
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
