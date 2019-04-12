import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface Calcul {
  calcul: string;
  result: string;
}

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {
  resultSubject = new Subject<Calcul>();
  changeInputSubject = new Subject<Calcul>();
  private history: Calcul[] = [];
  constructor() { }

  setResult(result: Calcul): void {
    this.history.unshift(result);
    this.emitResultSubject(result);
  }

  setHistoryToInput(result: Calcul): void {
    this.emitChangeInputSubject(result);
  }

  clearHistory(): void {
    this.history = [];
  }

  deleteResult(index: number): void {
    this.history.splice(index, 1);
  }

  getResults(): Calcul[] {
    return this.history;
  }

  emitResultSubject(result: Calcul): void {
    this.resultSubject.next(result);
  }

  emitChangeInputSubject(result: Calcul): void {
    this.changeInputSubject.next(result);
  }
}
