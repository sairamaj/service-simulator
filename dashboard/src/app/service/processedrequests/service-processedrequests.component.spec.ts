import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceProcessedRequestComponent } from './service-processedrequests.component';

describe('ServiceLastrequestsComponent', () => {
  let component: ServiceProcessedRequestComponent;
  let fixture: ComponentFixture<ServiceProcessedRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceProcessedRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceProcessedRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
