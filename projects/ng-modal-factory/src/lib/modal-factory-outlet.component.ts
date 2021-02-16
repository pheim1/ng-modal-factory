import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ModalFactoryService } from './modal-factory.service';

@Component({
  selector: 'ng-modal-factory-outlet',
  template: `
    <ng-container #outlet></ng-container>
  `,
  styles: [
  ]
})
export class ModalFactoryOutletComponent implements OnInit {

  @ViewChild('outlet', { read: ViewContainerRef }) outlet: ViewContainerRef;

  constructor(private modalFactoryService: ModalFactoryService) {}

  ngOnInit(): void {
    // TODO: Sink subscription on destroy.
    this.modalFactoryService.modalObservable.subscribe((openModalData) => {
      this.launchModal(openModalData);
    });
  }

  private launchModal(openModalData: OpenModalData) {
    this.outlet.clear();
    this.outlet.createComponent(openModalData.factory, null, openModalData.injector);
  }

}

export interface OpenModalData {
  factory: any,
  injector?: any
}