import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyAGDJSQrFrZksxGHGRIebyqBwobWftS1VE",
    authDomain: "calendario-d2f40.firebaseapp.com",
    databaseURL: "https://calendario-d2f40.firebaseio.com",
    projectId: "calendario-d2f40",
    storageBucket: "calendario-d2f40.appspot.com",
    messagingSenderId: "850188662389"
  }
};


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule, // for database
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
