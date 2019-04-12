import { Component, OnInit, OnDestroy } from '@angular/core';
import { CalculatorService, Calcul } from '../calculator/calculator.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-calculator-history',
  templateUrl: './calculator-history.component.html',
  styleUrls: ['./calculator-history.component.scss']
})
export class CalculatorHistoryComponent implements OnInit, OnDestroy {
  resultSubscription: Subscription;
  private history: Calcul[] = [];
  constructor(private calculatorService: CalculatorService) { }

  ngOnInit() {
    this.resultSubscription = this.calculatorService.resultSubject.subscribe(
      (result: Calcul) => {
        this.history.unshift(result);
      }
    );
  }

  clearHistory(): void {
    this.history = [];
    this.calculatorService.clearHistory();
  }

  deleteResult(index: number): void {
    this.history.splice(index, 1);
    this.calculatorService.deleteResult(index);
  }

  ngOnDestroy(): void {
    this.resultSubscription.unsubscribe();
  }

  onResultClicked(result: Calcul): void {
    this.calculatorService.setHistoryToInput(result);
  }
}
