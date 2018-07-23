import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceEditResponseComponent } from './service-edit-response.component';

describe('HostNewresponseComponent', () => {
  let component: ServiceEditResponseComponent;
  let fixture: ComponentFixture<ServiceEditResponseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceEditResponseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceEditResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
