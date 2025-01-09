import { Component, Inject, OnDestroy, OnInit, Optional, TemplateRef } from '@angular/core';
import { ClarityModalButton } from 'ng-modal-factory';

@Component({
    selector: 'app-alert-modal',
    templateUrl: './alert-modal.component.html',
    styleUrls: ['./alert-modal.component.css'],
    standalone: false
})
export class AlertModalComponent {

  modalOpen: boolean = true;

  constructor(@Inject('buttons') public buttons: ClarityModalButton[], 
              @Optional()
              @Inject('bodyTemplate') public bodyTemplate: TemplateRef<any>,
              @Optional()
              @Inject('headline') public headline: string) {}

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
