import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFactoryOutletComponent } from './modal-factory-outlet.component';

describe('ModalFactoryComponent', () => {
  let component: ModalFactoryOutletComponent;
  let fixture: ComponentFixture<ModalFactoryOutletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalFactoryOutletComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalFactoryOutletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
