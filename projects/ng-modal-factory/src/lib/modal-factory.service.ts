import { ComponentFactoryResolver, Injectable, Injector, TemplateRef } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { OpenModalData } from './modal-factory-outlet.component';

@Injectable({
  providedIn: 'root'
})
export class ModalFactoryService {

  private modalSubject: Subject<OpenModalData> = new Subject();
  public modalObservable: Observable<OpenModalData> = this.modalSubject.asObservable();

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  /**
   * Opens a new modal. The povided component will be instantiated and rendered inside of the modal outlet. 
   * So make sure to place the ```<ng-modal-factory-outlet>```.
   * @param data The provided data which at least contains the component which will be displayed.
   */
  public openNewModal<T extends BaseModalData>(data: T): void {
    let defaults = { inputs: {} };
    data = Object.assign({}, defaults, data);

    const inputProviders = Object.keys(data.inputs).map((inputName) => ({
      provide: inputName,
      useValue: data.inputs[inputName],
    }));

    const injector = Injector.create({ providers: inputProviders });
    const factory = this.componentFactoryResolver.resolveComponentFactory(data.component);

    this.modalSubject.next({ factory: factory, injector: injector });
  }
}

export interface ClarityModalButton {
  text: string,
  type?: 'primary' | 'success' | 'warning' | 'danger',
  style?: 'outline' | 'link',
  size?: 'sm'
  disabled?: boolean,
  click: () => void
}

export interface BaseModalData {
  component: any;
  inputs?: any;
}

export interface AlertModalData extends BaseModalData {
  inputs: {
    headline: string,
    bodyTemplate: TemplateRef<any>,
    buttons: ClarityModalButton[]
  };
}