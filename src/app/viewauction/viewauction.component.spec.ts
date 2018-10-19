import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewauctionComponent } from './viewauction.component';

describe('ViewauctionComponent', () => {
  let component: ViewauctionComponent;
  let fixture: ComponentFixture<ViewauctionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewauctionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewauctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
