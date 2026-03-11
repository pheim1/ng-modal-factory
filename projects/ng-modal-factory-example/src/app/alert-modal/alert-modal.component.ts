import { Component, inject, InjectionToken, TemplateRef } from '@angular/core';
import { ClarityModalButton } from 'ng-modal-factory';

export interface AlertModalInputs {
  headline?: string;
  bodyTemplate?: TemplateRef<any>;
  buttons: ClarityModalButton[];
}

export const ALERT_DATA = new InjectionToken<AlertModalInputs>('alertData');

@Component({
    selector: 'app-alert-modal',
    templateUrl: './alert-modal.component.html',
    styleUrls: ['./alert-modal.component.css'],
    standalone: false
})
export class AlertModalComponent {

  modalOpen: boolean = true;
  data = inject(ALERT_DATA);

  public buttonClick(button: ClarityModalButton) {
    button.click();
    this.modalOpen = false;
  } 

  getCssClasses(button: ClarityModalButton) {
    let classes = `btn `;

    if (button.type) classes += `btn-${button.type} `;

    if (button.style) classes += `btn-${button.style} `;

    if (button.size) classes += `btn-${button.size} `;

    return classes;
  }

}
