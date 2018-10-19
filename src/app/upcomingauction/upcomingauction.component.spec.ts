import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingauctionComponent } from './upcomingauction.component';

describe('UpcomingauctionComponent', () => {
  let component: UpcomingauctionComponent;
  let fixture: ComponentFixture<UpcomingauctionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpcomingauctionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpcomingauctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
