import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ModalFactoryModule } from 'ng-modal-factory';

import { AppComponent } from './app.component';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { ClarityModule } from '@clr/angular';


@NgModule({
  declarations: [
    AppComponent,
    AlertModalComponent
  ],
  imports: [
    BrowserModule,
    ClarityModule,
    ModalFactoryModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
