import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveauctionComponent } from './liveauction.component';

describe('LiveauctionComponent', () => {
  let component: LiveauctionComponent;
  let fixture: ComponentFixture<LiveauctionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveauctionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveauctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
