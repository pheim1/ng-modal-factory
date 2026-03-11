import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

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
  providers: [provideAnimationsAsync()],
  bootstrap: [AppComponent]
})
export class AppModule { }
