import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WinhistoryComponent } from './winhistory.component';

describe('WinhistoryComponent', () => {
  let component: WinhistoryComponent;
  let fixture: ComponentFixture<WinhistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WinhistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WinhistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
