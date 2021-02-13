import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ModalFactoryModule, ModalFactoryOutletComponent } from 'dist/ng-modal-factory';

import { AppComponent } from './app.component';
import { AlertModalComponent } from './alert-modal/alert-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    AlertModalComponent
  ],
  imports: [
    BrowserModule,
    ModalFactoryModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
