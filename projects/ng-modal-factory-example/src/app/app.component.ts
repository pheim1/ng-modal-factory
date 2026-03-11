import { Component, ViewChild } from '@angular/core';
import { BaseModalData, ModalFactoryService } from 'ng-modal-factory';
import { ALERT_DATA, AlertModalComponent, AlertModalInputs } from './alert-modal/alert-modal.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: false
})
export class AppComponent {

  @ViewChild('modalBody') modalBody;

  constructor(private modalFactoryService: ModalFactoryService) {}

  public openModal()
  {
    this.modalFactoryService.openNewModal<BaseModalData<AlertModalInputs>>({
      component: AlertModalComponent,
      token: ALERT_DATA,
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
