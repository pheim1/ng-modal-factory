import { TestBed } from '@angular/core/testing';

import { ModalFactoryService } from './modal-factory.service';

describe('ModalFactoryService', () => {
  let service: ModalFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
