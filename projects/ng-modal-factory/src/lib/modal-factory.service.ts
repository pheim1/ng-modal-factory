import { InjectionToken, Injectable, Injector, StaticProvider } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { OpenModalData } from './modal-factory-outlet.component';

@Injectable({
  providedIn: 'root'
})
export class ModalFactoryService {

  private modalSubject: Subject<OpenModalData> = new Subject();
  public modalObservable: Observable<OpenModalData> = this.modalSubject.asObservable();

  /**
   * Opens a new modal. The provided component will be instantiated and rendered inside of the modal outlet.
   * So make sure to place the ```<ng-modal-factory-outlet>```.
   * @param data The provided data which at least contains the component which will be displayed.
   */
  public openNewModal<T extends BaseModalData>(data: T): void {
    let providers: StaticProvider[];

    if (data.token) {
      providers = [{ provide: data.token, useValue: data.inputs }];
    } else {
      const inputs = data.inputs ?? {};
      providers = Object.keys(inputs).map((inputName) => ({
        provide: inputName,
        useValue: (inputs as Record<string, any>)[inputName],
      }));
    }

    const injector = Injector.create({ providers });

    this.modalSubject.next({ component: data.component, injector });
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

export interface BaseModalData<T = any> {
  component: any;
  token?: InjectionToken<T>;
  inputs?: T;
}