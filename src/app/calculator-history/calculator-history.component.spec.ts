import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorHistoryComponent } from './calculator-history.component';

describe('CalculatorHistoryComponent', () => {
  let component: CalculatorHistoryComponent;
  let fixture: ComponentFixture<CalculatorHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalculatorHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculatorHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
