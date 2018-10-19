import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BidlogComponent } from './bidlog.component';

describe('BidlogComponent', () => {
  let component: BidlogComponent;
  let fixture: ComponentFixture<BidlogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BidlogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BidlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
