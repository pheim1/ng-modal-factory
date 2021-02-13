import { Component, ViewChild } from '@angular/core';
import { ModalFactoryService } from 'dist/ng-modal-factory';
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
    this.modalFactoryService.openNewAlertModal({
      component: AlertModalComponent,
      inputs: {
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
  }
}
