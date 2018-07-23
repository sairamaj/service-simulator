import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HostDetailResponseComponent } from './host-detail-response.component';

describe('HostDetailResponseComponent', () => {
  let component: HostDetailResponseComponent;
  let fixture: ComponentFixture<HostDetailResponseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HostDetailResponseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostDetailResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
