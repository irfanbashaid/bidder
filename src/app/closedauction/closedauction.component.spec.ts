import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosedauctionComponent } from './closedauction.component';

describe('ClosedauctionComponent', () => {
  let component: ClosedauctionComponent;
  let fixture: ComponentFixture<ClosedauctionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClosedauctionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClosedauctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
