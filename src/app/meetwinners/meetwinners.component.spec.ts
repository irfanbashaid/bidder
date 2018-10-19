import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetwinnersComponent } from './meetwinners.component';

describe('MeetwinnersComponent', () => {
  let component: MeetwinnersComponent;
  let fixture: ComponentFixture<MeetwinnersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeetwinnersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetwinnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
