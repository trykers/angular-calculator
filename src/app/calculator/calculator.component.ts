import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { CalculatorService } from './calculator.service';
import { Subscription } from 'rxjs';

export interface Touche {
  name: string;
  cols?: string;
  rows?: string;
  operator?: boolean;
  fn?(a?: number, b?: number): any;
}

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit, OnDestroy {
  private touches: Touche[] = [
    { name: '/', operator: true, fn: (a, b) => a / b },
    { name: '*', operator: true, fn: (a, b) => a * b },
    { name: '7', fn: () => 7 }, { name: '8', fn: () => 8 }, { name: '9', fn: () => 9 }, { name: '-', operator: true, fn: (a, b) => a - b },
    { name: '4', fn: () => 4 }, { name: '5', fn: () => 5 }, { name: '6', fn: () => 6 }, { name: '+', operator: true, fn: (a, b) => a + b },
    { name: '1', fn: () => 1 }, { name: '2', fn: () => 2 }, { name: '3', fn: () => 3 }, { name: '=', rows: '2', operator: true },
    { name: '0', fn: () => 0, cols: '2' }, { name: '.' },
  ];
  private changeInputSubscription: Subscription;
  private errorExpression: boolean;
  private inputCalc: string;
  private calculated: boolean;
  private OPERATOR = new Set([
    '*', '/', '+', '-'
  ]);

  constructor(private calculatorService: CalculatorService) { }

  ngOnInit() {
    this.inputCalc = '';
    this.calculated = false;
    this.errorExpression = false;
    this.changeInputSubscription = this.calculatorService.changeInputSubject.subscribe(
      (changeInput) => {
        this.inputCalc = changeInput.calcul;
      }
    );
  }

  ngOnDestroy() {
    this.changeInputSubscription.unsubscribe();
  }

  onButtonClicked(touche: string): void {
    if (touche === '=') {
      const result = this.calculate();
      if (!this.errorExpression) {
        this.setResult(result);
        this.calculated = true;
      }
    } else {
      if (this.calculated) {
        if (!this.OPERATOR.has(touche)) {
          this.inputCalc = '';
        }
        this.calculated = false;
        this.errorExpression = false;
      }
      this.inputCalc += touche;
    }
  }

  calculate(): string[] {
    this.errorExpression = false;
    const parsed = this.parse();
    let loop = true;

    for (const cOp of Array.from(this.OPERATOR.values())) {
      loop = true;
      const fn = this.touches.find((touche) => touche.name === cOp).fn;
      do {
        const opIndex = parsed.findIndex((value) => value === cOp);
        if (opIndex !== -1) {
          parsed.splice(opIndex - 1, 3, fn(+parsed[opIndex - 1], +parsed[opIndex + 1])); // Dynamic function from keyboard !!!
        } else {
          loop = false;
        }
      } while (loop);
    }

    return parsed;
  }

  setResult(result: string[]): void {
    const resultToStr = result.join('');
    this.calculatorService.setResult({
      calcul: this.inputCalc,
      result: resultToStr,
    });
    this.inputCalc = resultToStr;
  }

  /**
   * Afficher la div d'erreur et effacer le contenu de l'input
   */
  setError(): void {
    this.errorExpression = true;
    this.inputCalc = '';
  }

  /**
   * Cette fonction permet de parser l'expression en un tableau
   * Exemple `9+9.05-8` retourne ["9", "+", "9.05", "-", "8"]
   * @return string[]
   */
  parse(): string[] {
    let parsedExpression = [];
    let index = 0;
    let precedentIndex = 0;
    let lastChar = '';

    while (index < this.inputCalc.length && !this.errorExpression) { // On parcourt l'input reçu
      if (!this.OPERATOR.has(this.inputCalc[index])) { // Le charactère en cours est-il est opérateur ?
        const currentChar = this.inputCalc[index];
        if (currentChar !== '.' && isNaN(+currentChar)) { // Est-il un nombre ?
          this.setError(); // Une erreur est survenu... on stop tout...
          parsedExpression = [];
          break;
        }

        if (currentChar === '.' && lastChar === '.') {
          this.setError();
          parsedExpression = [];
          break;
        }

        if (parsedExpression[parsedExpression.length - 1] === '-' && precedentIndex === 0) { // Premier caractère est un '-'
          parsedExpression[parsedExpression.length - 1] = `${parsedExpression[parsedExpression.length - 1]}${currentChar}`;
        } else if (!this.OPERATOR.has(parsedExpression[parsedExpression.length - 1]) && parsedExpression[parsedExpression.length - 1]) {
          // Le caractère précedent est un nombre... Donc le caractère en cours n'est rien d'autre que la suite du nombre
          parsedExpression[parsedExpression.length - 1] = `${parsedExpression[parsedExpression.length - 1]}${currentChar}`;
          lastChar = currentChar;
        } else {
          parsedExpression.push(currentChar); // Nouveau nombre, on ajoute
          lastChar = currentChar;
        }
        precedentIndex = index; // Ok, on continu
      } else {
        if (!this.OPERATOR.has(parsedExpression[parsedExpression.length - 1])) {
          if (index === 0 || this.inputCalc.length - 1 === index) {
            if (index !== 0 && this.inputCalc[index] !== '-') {
              this.setError();
              parsedExpression = [];
              break;
            }
          }
          parsedExpression.push(this.inputCalc[index]);
          precedentIndex = index;
        } else {
          this.setError(); // Une erreur est survenu... on stop tout...
          parsedExpression = [];
          break;
        }
      }
      index++;
    }

    return parsedExpression;
  }
}
