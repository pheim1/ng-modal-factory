import { Component, ViewChild } from '@angular/core';
import { AlertModalData, ModalFactoryService } from 'dist/ng-modal-factory';
import { BaseModalData } from 'projects/ng-modal-factory/src/public-api';
import { AlertModalComponent } from './alert-modal/alert-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild('modalBody') modalBody;

  constructor(private modalFactoryService: ModalFactoryService) {}

  public openModal()
  {
    this.modalFactoryService.openNewModal<AlertModalData>({
      component: AlertModalComponent,
      inputs: {
        headline: "My modal headline...",
        bodyTemplate: this.modalBody,
        buttons: [
          {
            text: 'custom',
            style: 'link',
            click: () => console.log('custom')
          },
          {
            text: 'Cancel',
            style: 'outline',
            click: () => console.log('Cancel'),
          },
          {
            text: 'Ok',
            type: 'primary',
            click: () => console.log('Ok'),
          },
        ],
      },
    });

    /* this.modalFactoryService.openNewModal<BaseModalData>({component: AlertModalComponent}) */
  }
}
