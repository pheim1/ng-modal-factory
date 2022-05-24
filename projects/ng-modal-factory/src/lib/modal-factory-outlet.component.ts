import { Component, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalFactoryService } from './modal-factory.service';

@Component({
  selector: 'ng-modal-factory-outlet',
  template: `
    <ng-container #outlet></ng-container>
  `,
  styles: [
  ]
})
export class ModalFactoryOutletComponent implements OnInit, OnDestroy {

  @ViewChild('outlet', { read: ViewContainerRef }) outlet: ViewContainerRef;
  private modalFactoryServiceSubscription: Subscription;

  constructor(private modalFactoryService: ModalFactoryService) {}

  ngOnInit(): void {
    this.modalFactoryServiceSubscription = this.modalFactoryService.modalObservable.subscribe((openModalData) => {
      this.launchModal(openModalData);
    });
  }

  ngOnDestroy(): void {
    this.modalFactoryServiceSubscription.unsubscribe();
  }

  private launchModal(openModalData: OpenModalData) {
    this.outlet.clear();
    this.outlet.createComponent(openModalData.factory, 0, openModalData.injector);
  }

}

export interface OpenModalData {
  factory: any,
  injector?: any
}